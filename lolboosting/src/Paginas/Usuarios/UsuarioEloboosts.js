import React from 'react'
import  { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import TarjetaUsuariosEloboosts from '../../Componentes/Usuarios/TarjetaUsuariosEloboosts'
export default function UsuarioEloboosts() {
  const navigate = useNavigate()
  const [Eloboost, setEloboost] = useState([])
  let EloboostActivo
  let EloboostContratados
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }else{
        axios.get("/eloboosts",{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(res => {
            console.log(res)
            if(res.status===200){
                setEloboost(res.data)
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
  EloboostActivo = Eloboost.filter(x => x.id_booster == localStorage.getItem("IdUsuario"))
  console.log(EloboostActivo)
  console.log("Servicios contratados")
  EloboostContratados = Eloboost.filter(x => x.id_cliente == localStorage.getItem("IdUsuario"))
  console.log(EloboostContratados)
  return (
    <div className='container'>
        <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/miperfil'>Mi Perfil</Link>/Eloboosts</div>
        <h1 className='flex justify-center text-white text-3xl mb-3 mt-3'>Solicitudes de Eloboost en mi cuenta</h1>
        <div className='grid grid-cols-1 gap-10'>
            {Eloboost.filter(Boost=> Boost.id_cliente===localStorage.getItem("IdUsuario")).map(Boost=>(
                <TarjetaUsuariosEloboosts Eloboost={Boost} key={Boost._id}/>
            ))}
    
        </div>
        <div>
            <h1 className='flex justify-center text-white text-3xl mb-3 mt-3'>Eloboost Ofrecidos a Usuarios</h1>
            <div className='grid grid-cols-1 gap-10'>
            {Eloboost.filter(Eloboost=> Eloboost.id_booster===localStorage.getItem("IdUsuario")).map(Boost=>(
                <TarjetaUsuariosEloboosts Eloboost={Boost} key={Boost._id}/>
            ))}
            </div>
        </div>
    </div>
  )
}
