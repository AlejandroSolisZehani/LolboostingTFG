import React, {useEffect, useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Tarjetavercuentas } from "../../Componentes/Cuentas/Tarjetavercuentas"
import toast from "react-hot-toast"
function Vercuentas() {
    const [cuentas, setCuentas] = useState([])
    const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }else{
        axios.get("/cuentas",{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(response => setCuentas(response.data))
        .catch(error => {
            console.log(error)
            if(error.response.data.message==="jwt expired"){
                toast.error("Sesión Cerrada vuelve a Loggearte")
                localStorage.clear()
                navigate("/login")
            }
        })
    }
  }, []); 
    

  if(cuentas.filter(cuenta=> cuenta.activo===true).length===0){
    return <div className='flex justify-center'>
      <div>No hay cuentas todavia</div>
      <br></br>
      <div className='flex justify-center px-12 py-12 text-3xl mx-4 my-4 h-24'><button className='bg-orange-500 ' onClick={()=>{navigate("/vendercuenta")}}>Vender Cuenta</button></div>
    </div>
  }else{
    return <div>
      <div className='flex justify-center px-12 py-12 text-3xl mx-4 my-4 h-24'>
        <div className="mb-20 text-white">
      <button className='bg-orange-500 mb-20' onClick={()=>{navigate("/vendercuenta")}}>Vender Cuenta</button><br></br>
      </div>
      </div>
      <div className='grid grid-cols-1 gap-10 mb-10 mt-10'>
        {cuentas.filter(cuenta=> cuenta.activo===true).map(cuenta=>(
            <Tarjetavercuentas cuentadatos={cuenta} key={cuenta._id}/>
        ))}
    </div>
    </div>
  }
      
    
    
  
}

export default Vercuentas