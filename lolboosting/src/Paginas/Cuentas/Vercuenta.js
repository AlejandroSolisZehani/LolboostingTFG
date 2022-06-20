import React, {useEffect, useState} from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Tarjetacuenta } from "../../Componentes/Cuentas/Tarjetacuenta"
import { useParams } from "react-router-dom"
function Vercuenta() {
    const token=localStorage.getItem("TokenUsuario")
    const [cuenta, setCuenta] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
      if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
        navigate("/login")
      }else{
        axios.get(`/cuentas/${params.id}`,{ headers: {"x-access-token" : `${token}`} })
        .then(response => setCuenta(response.data))
        .catch(error => console.log(error))
    }},[])
      if(cuenta.length===0){
          return <div><div className='text-2xl text-white'><Link to='/'>Lolboosting</Link><Link to='/cuentas'>/Cuentas</Link>/Cuenta</div><div className='flex justify-center bg-red'>
          No se ha encontrado la cuenta
      </div>
          </div>
      }else if(cuenta.activo===false){

        return <div><div className='text-2xl text-white'><Link to='/'>Lolboosting</Link><Link to='/cuentas'>/Cuentas</Link></div>
        <div className="flex justify-center">Esta solicitud de boost de Maestria ya no esta activa</div></div>
      }else{
        return <div><div className='text-2xl text-white'><Link to='/'>Lolboosting</Link><Link to='/cuentas'>/Cuentas</Link></div><div className='grid grid-cols-1 mb-10'>
        <Tarjetacuenta cuentadatos={cuenta} key={cuenta._id}/>
   
    </div>
    </div>
      }
    
    
  
}

export default Vercuenta