import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import TarjetasCoachings from '../../Componentes/Admins/TarjetasCoachings'

function Admincoachings() {
  const navigate = useNavigate()
  const [Coachings, setCoachings] = useState([])
  useEffect(()=>{
      if(localStorage.getItem("IdUsuario")==null || localStorage.getItem("TokenUsuario")==null){
          navigate("/login")
      }
      axios.get(`/usuarios/${localStorage.getItem("IdUsuario")}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
      .then(res =>{
          console.log(res)
          if(res.status===200){
              if(res.data.roles!='Admin'){
                  toast.error("No tienes permisos")
                  navigate('/miperfil')
              }
          }
      })
      .catch(error=>{
          console.log(error)
              if(error.response.data.message==="jwt expired"){
                  toast.error("Sesión Cerrada vuelve a Loggearte")
                  localStorage.clear()
                  navigate("/login")
              }else if(error.response.status===404){
                  toast.error("No se ha encontrado el usuario actual")
                  localStorage.clear()
                  navigate("/login")
              }else{
                  toast.error("Hubo un error")
                  navigate("/admin")
              }
      })
      axios.get("/coachings",{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
      .then(res=>{
          console.log(res)
          if(res.status===200){
              setCoachings(res.data)
          }
      })
      .catch(error=>{
          if(error.response.status===404){
              toast.error("No se ha encontrado nada")
              navigate("/admin")
          }
          else if(error.response.data.message==="jwt expired"){
          toast.error("Sesión Cerrada vuelve a Loggearte")
          localStorage.clear()
          navigate("/login")
      }else if(error.response.status===500){
              toast.error("Hubo un error en el servidor")
              navigate("/admin")
      }else{
          toast.error("Hubo un error")
          navigate("/admin")
      }
      })
  },[Coachings])
return (
  
      <div className='grid grid-cols-1 gap-10'>
          {Coachings.map(Coach=>(
              <TarjetasCoachings Coach={Coach} key={Coach._id}/>
          ))}
  
      </div>
)
}

export default Admincoachings