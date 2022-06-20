import React from 'react'
import  { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import TarjetaUsuariosMaestria from '../../Componentes/Usuarios/TarjetaUsuariosMaestrias'

export default function UsuarioMaestrias() {
  const navigate = useNavigate()
  const [Maestria, setMaestria] = useState([])
  let MaestriaActiva
  let MaestraisContratadas
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }else{
        axios.get("/maestrias",{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(res => {
            console.log(res)
            if(res.status===200){
                setMaestria(res.data)
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
  },[Maestria])
  console.log("Mis servicios")
  MaestriaActiva = Maestria.filter(x => x.id_booster == localStorage.getItem("IdUsuario"))
  console.log(MaestriaActiva)
  console.log("Servicios contratados")
  MaestraisContratadas = Maestria.filter(x => x.id_cliente == localStorage.getItem("IdUsuario"))
  console.log(MaestraisContratadas)
  return (
    <div className='container'>
        <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/miperfil'>Mi Perfil</Link>/Maestrias</div>
        <h1 className='flex justify-center text-white text-3xl mb-3 mt-3'>Solicitudes Subida de Maestrias</h1>
        <div className='grid grid-cols-1 gap-10'>
            {Maestria.filter(Maestria=> Maestria.id_cliente===localStorage.getItem("IdUsuario")).map(Maestria=>(
                <TarjetaUsuariosMaestria Maestrias={Maestria} key={Maestria._id}/>
            ))}
    
        </div>
        <div>
            <h1 className='flex justify-center text-white text-3xl mb-3 mt-3'>Servicios de Maestrias Solicitados</h1>
            <div className='grid grid-cols-1 gap-10'>
            {Maestria.filter(Maestria=> Maestria.id_booster===localStorage.getItem("IdUsuario")).map(Maestria=>(
                <TarjetaUsuariosMaestria Maestrias={Maestria} key={Maestria._id}/>
            ))}
            </div>
        </div>
    </div>
  )
}
