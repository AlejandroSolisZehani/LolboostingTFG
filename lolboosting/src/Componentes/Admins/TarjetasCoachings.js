import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function TarjetasCoachings({Coach}) {
  const navigate = useNavigate()
  return (
    <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
    hover:bg-zinc-700 hover:cursor-pointer'>
        <p>{Coach.titulo}</p>
        <p>{Coach.idioma} Lenguaje del Coach</p>
        <p>{Coach.roles_preferidos} Roles Dominantes</p>
        <p>{Coach.partidas} Partidas</p>
        <p>{Coach.precio}€</p>
        <p><button className='bg-red-500' onClick={()=>{
            toast.dismiss()
            toast((t)=>(
                <div className='text-2xl text-white'>
                    <p>¿Eliminar? {Coach.titulo}</p>
                    <button className='bg-red-500 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                        axios.delete(`/coachings/${Coach._id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                        .then(res =>{
                            console.log(res)
                            if(res.status===204){
                                toast.dismiss()
                                toast.success("Se ha eliminado al usuario con exito")
                            }
                        })
                        .catch(error=>{
                            console.log(error)
                            if(error.response.status===404){
                                toast.error("No se encuentra el Usuario ")
                            }else if(error.response.data.message==="jwt expired"){
                                toast.dismiss(t.id)
                                toast.error("Sesión Cerrada vuelve a Loggearte")
                                localStorage.clear()
                                navigate("/login")
                            }else if(error.response.status===500){
                                toast.error("Hubo un error en el servidor")
                                navigate("/admin")
                            }
                        })
                    }}>Eliminar </button>
                    <button className='bg-slate-500 px-3 py-2 rounded-sm mx-2' onClick={()=>{toast.dismiss(t.id)}}>Cancelar </button>
                </div>
            ),{
                style:{
                    background: "#2c5466",
                }
            })
        }}>Eliminar</button></p>
    </div>
  )
}
