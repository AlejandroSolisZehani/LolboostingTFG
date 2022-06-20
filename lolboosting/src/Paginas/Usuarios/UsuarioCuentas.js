import React from 'react'
import  { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import TarjetaUsuariosCuentas from '../../Componentes/Usuarios/TarjetaUsuariosCuentas'
export default function UsuarioCuentas() {
  const navigate = useNavigate()
  const [Cuenta, setCuentas] = useState([])
  let Cuentasactivas
  let CuentasCompradas
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }else{
        axios.get("/cuentas",{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(res => {
            console.log(res)
            if(res.status===200){
                setCuentas(res.data)
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
  Cuentasactivas = Cuenta.filter(x => x.id_vendedor == localStorage.getItem("IdUsuario"))
  console.log(Cuentasactivas)
  console.log("Servicios contratados")
  CuentasCompradas = Cuenta.filter(x => x.id_comprador == localStorage.getItem("IdUsuario"))
  console.log(CuentasCompradas)
  return (
    <div className='container'>
        <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/miperfil'>Mi Perfil</Link>/Cuentas</div>
        <h1 className='flex justify-center text-white text-3xl mb-3 mt-3'>Cuentas Compradas</h1>
        <div className='grid grid-cols-1 gap-10'>
            {Cuenta.filter(Cuenta=> Cuenta.id_comprador===localStorage.getItem("IdUsuario")).map(Cuenta=>(
                <TarjetaUsuariosCuentas Cuentas={Cuenta} key={Cuenta._id}/>
            ))}
    
        </div>
        <div>
            <h1 className='flex justify-center text-white text-3xl mb-3 mt-3'>Cuentas Que Vendo</h1>
            <div className='grid grid-cols-1 gap-10'>
            {Cuenta.filter(Cuenta=> Cuenta.id_vendedor===localStorage.getItem("IdUsuario")).map(Cuenta=>(
                <TarjetaUsuariosCuentas Cuentas={Cuenta} key={Cuenta._id}/>
            ))}
            </div>
        </div>
    </div>
  )
}
