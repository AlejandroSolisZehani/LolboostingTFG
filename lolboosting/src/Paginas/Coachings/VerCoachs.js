import React, {useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import TarjetasCoachs from '../../Componentes/Coachings/TarjetasCoachs'


export default function VerCoachs() {
    const navigate = useNavigate()
    const [Coach, setCoach] = useState([])

    useEffect(()=>{
        if(localStorage.getItem("IdUsuario")==null || localStorage.getItem("TokenUsuario")==null){
            navigate("/login")
        }else{
            axios.get(`/coachings`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
            .then(res =>{
                console.log(res)
                if(res.status===200){
                    setCoach(res.data)
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
                }else{
                    toast.error(error.response.data.message)
                }
            })
        }
    },[])
    if(Coach.filter(coach => coach.activo===true).length===0){
        return <div>No hay Ofertas de Coaching Disponibles </div>
    }else{
        return <div className='grid grid-cols-1 gap-10'>
            {Coach.filter(coach=> coach.activo===true).map(coach=>(
                <TarjetasCoachs Coachings={coach} key={coach._id}/>
            ))}
    
        </div>
      }
}
