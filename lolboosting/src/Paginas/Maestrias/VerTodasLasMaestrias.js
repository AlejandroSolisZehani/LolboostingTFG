import React, {useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import TarjetaMaestrias from '../../Componentes/Maestrias/TarjetaMaestrias'
export default function VerTodasLasMaestrias() {
    const navigate= useNavigate()
    
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
      },[])
      const [Maestria, setMaestria] = useState([])
      if(Maestria.length===0){
        return <div>No hay solicitudes de Boost todavia</div>
      }else{
        return <div className='grid grid-cols-1 gap-10'>
        {Maestria.filter(Maestria=> Maestria.activo===true).map(Maestria=>(
            <TarjetaMaestrias Maestria={Maestria} key={Maestria._id}/>
        ))}

    </div>
      }
}
