import React, {useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import TarjetaBoost from '../../Componentes/Boosts/TarjetaBoost'
export function VerBoost() {
    const navigate = useNavigate()
    const params = useParams()
    useEffect(()=>{
        if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
          navigate("/login")
        }else{
            axios.get(`/eloboosts/${params.id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
            .then(res => {
                console.log(res)
                if(res.status===200){
                    setBoost(res.data)
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
      const [Boost, setBoost] = useState([])
      if(Boost.length===0){
        return <div>No hay solicitudes de Boost todavia</div>
      }else{
        return <div className='grid grid-cols-3 gap-3'>
            <TarjetaBoost Boost={Boost} key={Boost._id}/>
    </div>
}
}

