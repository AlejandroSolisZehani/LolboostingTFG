import React, {useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import TarjetaCoach from '../../Componentes/Coachings/TarjetaCoach'
export default function VerCoach() {
  const navigate = useNavigate()
  const [Coach, setCoach] = useState([])
  const params = useParams()
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null || localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }else{
      axios.get(`/coachings/${params.id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
      .then(res => {
        console.log(res)
        if(res.status===200){
          setCoach(res.data)
        }else if(res.status===404){
          toast.error("No se ha encontrado")
        }else{
          toast.error("Hubo un error")
        }
      })
      .catch(error => {
        console.log(error)
        if(error.response.data.message==="jwt expired"){
            toast.error("Sesión Cerrada vuelve a Loggearte")
            localStorage.clear()
            navigate("/login")
        }else if(error.response.status===404){
          toast.error("No se ha encontrado")
        }else{
          toast.error("Hubo un error")
        }
    })
    }
  },[])
  if(Coach.length===0){
    return <div>
      <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link><Link to='/coachings'>/Coachings</Link>/Coach</div>
      <div>No se ha encontrado la solicitud de coaching</div></div>
  }else if(Coach.activo===false){
    return <div>
      <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link><Link to='/coachings'>/Coachings</Link>/Coach</div>
      <div>Este coaching ya no esta disponible</div></div>
  }else{
    return <div><div className='text-2xl text-white'><Link to='/'>Lolboosting</Link><Link to='/coachings'>/Coachings</Link>/Coach</div><div className='grid grid-cols-1 gap-10 mb-10'>
      <TarjetaCoach Coach={Coach} />
    </div></div>
  }
}
