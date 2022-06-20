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
        return <div >
            <div>No hay solicitudes de Boost de Maestrias por el momento</div>
            <br></br>
            <div className='flex justify-center px-12 py-12 text-3xl mx-4 my-4 h-24'>
            <button className='bg-orange-500' onClick={()=>{navigate("/maestria")}}>Solicitar Eloboost de Maestria</button>
            </div>
            
        </div>
      }else{
        return <div>
            <div className='flex justify-center px-12 py-12 text-3xl mx-4 my-4 h-24'>
            <div className="mb-30 text-white">
            <button className='bg-orange-500 mb-10' onClick={()=>{navigate("/maestria")}}>Solicitar Maestria</button><br></br>
            </div>
            </div>
            <div className='grid grid-cols-1 gap-10 mt-20'>
        {Maestria.filter(Maestria=> Maestria.activo===true).map(Maestria=>(
            <TarjetaMaestrias Maestria={Maestria} key={Maestria._id}/>
        ))}

    </div>
    </div>
      }
}
