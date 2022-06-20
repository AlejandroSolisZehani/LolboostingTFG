import React, {useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import TarjetaMaestria from '../../Componentes/Maestrias/TarjetaMaestria'
export function VerMaestria() {
    const navigate = useNavigate()
    const params = useParams()
    const [Maestria, setMaestria] = useState([])
    useEffect(()=>{
        if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
          navigate("/login")
        }else{
            axios.get(`/maestrias/${params.id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
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
      
      if(Maestria.length===0){
        return <div>
          <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/maestrias'>/Maestrias</Link>/Maestria</div>
          <div className='flex justify-center'><div>No hay solicitudes de Boost de Maestria</div>
          </div>
          </div>
      }else if(Maestria.activo===false){

        return <div>
          Esta solicitud de boost de Maestria ya no esta activa
          <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/maestrias'>/Maestrias</Link>/Maestria</div>
          </div>
      }else{
        return <div>
            <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/maestrias'>/Maestrias</Link>/Maestria</div>
          <div className='grid grid-cols-1 gap-10 mb-10'>
            <TarjetaMaestria Maestria={Maestria} key={Maestria._id}/>
    </div>
    </div>
}
}

