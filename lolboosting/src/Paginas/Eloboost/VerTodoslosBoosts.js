import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
        return <div>
            <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/Eloboosts</div>
            <div>No hay solicitudes de Boost todavia</div>
            <br></br>
            <div className='flex justify-center px-12 py-12 text-3xl mx-4 my-4 h-24'>
            <button className='bg-orange-500 ' onClick={()=>{navigate("/eloboost")}}>Solicitar Eloboost</button>
            </div>
            
        </div>
      }else{
        return <div>
            <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/Eloboosts</div>
            <div className='flex justify-center px-12 py-12 text-3xl mx-4 my-4 h-24'>  
            <div className="mb-30 text-white">
            <button className='bg-orange-500 mb-10' onClick={()=>{navigate("/eloboost")}}>Solicitar Eloboost</button><br></br>
            </div>
            </div>
            
        <div className='gap-10 mb-10 mt-10 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2'>
        {Boost.filter(Boost=> Boost.activo===true).map(Boost=>(
            <TarjetasBoosts Boost={Boost} key={Boost._id}/>
        ))}

    </div>
    </div>
      }
}
