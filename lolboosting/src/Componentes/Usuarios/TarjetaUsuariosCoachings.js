import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function TarjetaUsuariosCoachings({Coachings}) {
  const navigate = useNavigate()
  if(localStorage.getItem("IdUsuario")==Coachings.id_cliente){
    return (
      <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
      hover:bg-zinc-700 hover:cursor-pointer'>
        <div className='flex justify-center'>
          <h1>ID: {Coachings._id}</h1>
        </div>
        <h2 className='flex justify-center'>Titulo: {Coachings.titulo}</h2>
        <p className='flex justify-center'>Servidor: {Coachings.servidor}</p>
        <p className='flex justify-center'>Rol preferido: {Coachings.roles_preferidos}</p>
        <p className='flex justify-center'>Idioma: {Coachings.idioma}</p>
        <p className='flex justify-center'>Partidas: {Coachings.partidas}</p>
        <p className='flex justify-center'>Id de la persona que compro el servicio</p>
        <p className='flex justify-center'>{Coachings.id_cliente}</p>
        <p className='flex justify-center'>Id de la persona que subio el servicio</p>
        <p className='flex justify-center'>{Coachings.id_booster}</p>
        <p className='flex justify-center'>Precio: {Coachings.precio}</p>
        <p className='flex justify-center'>Correo del Coach: {Coachings.correo_coach}</p>
        <div className='flex justify-center'>
        <button className='flex justify-center bg-red-500 text-3xl' onClick={()=>{
                        toast.dismiss()
                        toast((t)=>(
                            <div className='text-2xl text-white'>
                                <p>¿Eliminar? {Coachings.titulo}</p>
                                <button className='bg-red-500 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                                    axios.delete(`/cuentas/${Coachings._id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                                    .then(res =>{
                                        console.log(res)
                                        if(res.status===204){
                                            toast.dismiss()
                                            toast.success("Se ha eliminado el coach con exito")
                                        }
                                    })
                                    .catch(error=>{
                                        console.log(error)
                                        if(error.response.status===404){
                                            toast.error("El coaching ha sido borrada y no se encuentra ")
                                        }else if(error.response.data.message==="jwt expired"){
                                            toast.dismiss(t.id)
                                            toast.error("Sesión Cerrada vuelve a Loggearte")
                                            localStorage.clear()
                                            navigate("/login")
                                        }else if(error.response.status===500){
                                            toast.error("Hubo un error en el servidor")
                                            navigate("/miperfil")
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
        }}>Eliminar</button>
      </div>
      </div>
    )
  }else if(localStorage.getItem("IdUsuario")==Coachings.id_booster && Coachings.id_cliente!==""){
    return (
      <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
      hover:bg-zinc-700 hover:cursor-pointer'>
        <div className='flex justify-center'>
          <h1>ID: {Coachings._id}</h1>
        </div>
        <h2 className='flex justify-center'>Titulo: {Coachings.titulo}</h2>
        <p className='flex justify-center'>Servidor: {Coachings.servidor}</p>
        <p className='flex justify-center'>Rol preferido: {Coachings.roles_preferidos}</p>
        <p className='flex justify-center'>Idioma: {Coachings.idioma}</p>
        <p className='flex justify-center'>Partidas: {Coachings.partidas}</p>
        <p className='flex justify-center'>Id de la persona que compro el servicio</p>
        <p className='flex justify-center'>{Coachings.id_cliente}</p>
        <p className='flex justify-center'>Id de la persona que subio el servicio</p>
        <p className='flex justify-center'>{Coachings.id_booster}</p>
        <p className='flex justify-center'>Precio: {Coachings.precio}</p>
        <p className='flex justify-center'>Correo del Coach: {Coachings.correo_coach}</p>
        <div className='flex justify-center'>
        <button className='flex justify-center bg-red-500 text-3xl' onClick={()=>{
                        toast.dismiss()
                        toast((t)=>(
                            <div className='text-2xl text-white'>
                                <p>¿Ocultar? {Coachings.titulo}</p>
                                <button className='bg-red-500 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                                    axios.put(`/coachings/${Coachings._id}`,{id_booster:localStorage.getItem("IdUsuario")+"IDVIEJO"},{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                                    .then(res =>{
                                        console.log(res)
                                        if(res.status===200){
                                            toast.dismiss()
                                            toast.success("Se ha ocultado el coach con exito")
                                        }
                                    })
                                    .catch(error=>{
                                        console.log(error)
                                        if(error.response.status===404){
                                            toast.error("El coaching ha sido borrada y no se encuentra ")
                                        }else if(error.response.data.message==="jwt expired"){
                                            toast.dismiss(t.id)
                                            toast.error("Sesión Cerrada vuelve a Loggearte")
                                            localStorage.clear()
                                            navigate("/login")
                                        }else if(error.response.status===500){
                                            toast.error("Hubo un error en el servidor")
                                            navigate("/miperfil")
                                        }
                                    })
                                }}>Ocultar</button>
                                <button className='bg-slate-500 px-3 py-2 rounded-sm mx-2' onClick={()=>{toast.dismiss(t.id)}}>Cancelar </button>
                            </div>
                        ),{
                            style:{
                                background: "#2c5466",
                            }
                        })
        }}>Ocultar de mi vista</button>
      </div>
      </div>
    )
  }else{
    return (
      <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
      hover:bg-zinc-700 hover:cursor-pointer'>
        <div className='flex justify-center'>
          <h1>ID: {Coachings._id}</h1>
        </div>
        <h2 className='flex justify-center'>Titulo: {Coachings.titulo}</h2>
        <p className='flex justify-center'>Servidor: {Coachings.servidor}</p>
        <p className='flex justify-center'>Rol preferido: {Coachings.roles_preferidos}</p>
        <p className='flex justify-center'>Idioma: {Coachings.idioma}</p>
        <p className='flex justify-center'>Partidas: {Coachings.partidas}</p>
        <p className='flex justify-center'>Id de la persona que compro el servicio</p>
        <p className='flex justify-center'>{Coachings.id_cliente}</p>
        <p className='flex justify-center'>Id de la persona que subio el servicio</p>
        <p className='flex justify-center'>{Coachings.id_booster}</p>
        <p className='flex justify-center'>Precio: {Coachings.precio}</p>
        <p className='flex justify-center'>Correo del Coach: {Coachings.correo_coach}</p>
        <div className='flex justify-center'>
        <button className='flex justify-center bg-indigo-500 text-3xl' onClick={()=>{
        navigate(`/editarcoach/${Coachings._id}`)
        }}>Editar</button>
      </div>
      </div>
    )
  }

}

export default TarjetaUsuariosCoachings