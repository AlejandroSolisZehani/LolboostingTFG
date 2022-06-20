import React, {useEffect, useState} from "react"
import axios from "axios"
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
          return <div className='flex justify-center bg-red'>
          No se ha encontrado la cuenta
      </div>
          
      }else if(cuenta.activo===false){

        return <div className="flex justify-center">Esta solicitud de boost de Maestria ya no esta activa</div>
      }else{
        return <div className='grid grid-cols-1 mb-10'>
        <Tarjetacuenta cuentadatos={cuenta} key={cuenta._id}/>
   
    </div>
      }
    
    
  
}

export default Vercuenta