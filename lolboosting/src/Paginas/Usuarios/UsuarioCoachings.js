import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import TarjetaUsuariosCoachings from '../../Componentes/Usuarios/TarjetaUsuariosCoachings'
export default function UsuarioCoachings() {
  const navigate = useNavigate()
  const [Coach, setCoachs] = useState([])
  let CoachActivo
  let Coachcontratado
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }else{
        axios.get("/coachings",{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(res => {
            console.log(res)
            if(res.status===200){
                setCoachs(res.data)
            }
        })
        .catch(error => {
            console.log(error)
            if(error.response.data.message==="jwt expired"){
                toast.error("Sesión Cerrada vuelve a Loggearte")
                localStorage.clear()
                navigate("/login")
            }
        })
    }
  },[])
  console.log("Mis servicios")
  CoachActivo = Coach.filter(x => x.id_booster == localStorage.getItem("IdUsuario"))
  console.log(CoachActivo)
  console.log("Servicios contratados")
  Coachcontratado = Coach.filter(x => x.id_cliente == localStorage.getItem("IdUsuario"))
  console.log(Coachcontratado)
  return (
    <div className='container'>
        <h1 className='flex justify-center text-white text-3xl mb-3 mt-3'>Coachs contratados</h1>
        <div className='grid grid-cols-1 gap-10'>
            {Coach.filter(coach=> coach.id_cliente===localStorage.getItem("IdUsuario")).map(coach=>(
                <TarjetaUsuariosCoachings Coachings={coach} key={coach._id}/>
            ))}
    
        </div>
        <div>
            <h1 className='flex justify-center text-white text-3xl mb-3 mt-3'>Coachs Que ofrezco</h1>
            <div className='grid grid-cols-1 gap-10'>
            {Coach.filter(coach=> coach.id_booster===localStorage.getItem("IdUsuario")).map(coach=>(
                <TarjetaUsuariosCoachings Coachings={coach} key={coach._id}/>
            ))}
            </div>
        </div>
    </div>
  )
  
}
