import React, {useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import TarjetasBoosts from '../../Componentes/Boosts/TarjetasBoosts'
export default function VerTodoslosBoosts() {
    const navigate= useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
          navigate("/login")
        }else{
            axios.get("/eloboosts",{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
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
        {Boost.filter(Boost=> Boost.activo===true).map(Boost=>(
            <TarjetasBoosts Boost={Boost} key={Boost._id}/>
        ))}

    </div>
      }
}
