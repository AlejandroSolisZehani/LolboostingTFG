import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { PerfilUsuario } from '../../Componentes/Usuarios/PerfilUsuario'
export default function Perfil() {
  const navigate = useNavigate()
  const [usuario, SetUsuario] = useState([])
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }else{
      axios.get(`/usuarios/${localStorage.getItem("IdUsuario")}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
      .then(response => {SetUsuario(response.data)
       console.log(response) 
      })
      .catch(error => {
        console.log(error)
            if(error.response.data.message==="jwt expired"){
                toast.error("Sesión Cerrada vuelve a Loggearte")
                localStorage.clear()
                navigate("/login")
            }
      })
  }},[])
  return (
  <div className='bg-slate-500 text-slate-50'>
     <PerfilUsuario Perfil={usuario}/>
  </div>
  )
}
