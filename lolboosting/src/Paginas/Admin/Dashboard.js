import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import TarjetaDashboard from '../../Componentes/Admins/TarjetaDashboard'
export default function Dashboard() {
    const navigate = useNavigate()
    const [Usuario, setUsuario] = useState([])
    useEffect(()=>{
        if(localStorage.getItem("IdUsuario")==null || localStorage.getItem("TokenUsuario")==null){
            navigate("/login")
        }
        axios.get(`/usuarios/${localStorage.getItem("IdUsuario")}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(res =>{
            console.log(res)
            if(res.status===200){
                console.log(res)
                setUsuario(res.data)
            }
        })
        .catch(error =>{
            console.log(error)
            if(error.response.status===404){
                toast.error("No se ha encontrado el usuario")
                navigate("/login")
            }else if(error.response.status===500){
                toast.error("Hubo un error en el servidor")
                navigate("/login")
            }else if(error.response.data.message==="jwt expired"){
                toast.error("Sesión Cerrada vuelve a Loggearte")
                localStorage.clear()
                navigate("/login")
            }
        })
    },[])
    console.log(Usuario)
    if(Usuario.roles=='Usuario'){
        toast.error("no eres admin")
        navigate("/")
    }
  return (
    <div className='bg-slate-500 text-slate-50'>
        <TarjetaDashboard Usuario={Usuario}/>
    </div>
  )
}
