import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function TarjetaUsuariosEloboosts({Eloboost}) {
  const navigate = useNavigate()
  if(localStorage.getItem("IdUsuario")==Eloboost.id_cliente && Eloboost.id_booster!==""){
    return (
      <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
      hover:bg-zinc-700 hover:cursor-pointer'>
        <p className='flex justify-center'>ID: {Eloboost._id}</p>
        <p className='flex justify-center'>Titulo: {Eloboost.titulo}</p>
        <p className='flex justify-center'>Liga Inicial: {Eloboost.liga_inicio}</p>
        <p className='flex justify-center'>Liga Deseada: {Eloboost.liga_deseada}</p>
        <p className='flex justify-center'>Precio: {Eloboost.precio}€</p>
        <p className='flex justify-center'>Rol Preferido: {Eloboost.rol_preferido}</p>
        <p className='flex justify-center'>ID Booster: {Eloboost.id_booster}</p>
        <p className='flex justify-center'>ID Cliente: {Eloboost.id_cliente}</p>
        <p className='flex justify-center'>Nombre Invocador: {Eloboost.nombre_cuenta}</p>
        <p className='flex justify-center'>Contraseña Cuenta: {Eloboost.passwd_cuenta}</p>
        <p className='flex justify-center'>Campeon Preferido: {Eloboost.campeon_preferido}</p>
        <div className='flex justify-center'>
          <button className='flex justify-center bg-red-500 text-3xl' onClick={()=>{
                          toast.dismiss()
                          toast((t)=>(
                              <div className='text-2xl text-white'>
                                  <p>¿Eliminar? {Eloboost.titulo}</p>
                                  <button className='bg-red-500 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                                      axios.delete(`/eloboosts/${Eloboost._id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                                      .then(res =>{
                                          console.log(res)
                                          if(res.status===204){
                                              toast.dismiss()
                                              toast.success("Se ha eliminado el Eloboost con exito")
                                          }
                                      })
                                      .catch(error=>{
                                          console.log(error)
                                          if(error.response.status===404){
                                              toast.error("El Eloboost ha sido borrado y no se encuentra ")
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
  }else if(localStorage.getItem("IdUsuario")==Eloboost.id_booster && Eloboost.id_cliente!==""){
    return (
      <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
      hover:bg-zinc-700 hover:cursor-pointer'>
        <p>ID: {Eloboost._id}</p>
        <p>Titulo: {Eloboost.titulo}</p>
        <p>Liga Inicial: {Eloboost.liga_inicio}</p>
        <p>Liga Deseada: {Eloboost.liga_deseada}</p>
        <p>Precio: {Eloboost.precio}€</p>
        <p>Rol Preferido: {Eloboost.rol_preferido}</p>
        <p>ID Booster: {Eloboost.id_booster}</p>
        <p>ID Cliente: {Eloboost.id_cliente}</p>
        <p>Nombre Invocador: {Eloboost.nombre_cuenta}</p>
        <p>Contraseña Cuenta: {Eloboost.passwd_cuenta}</p>
        <p>Campeon Preferido: {Eloboost.campeon_preferido}</p>
        <div className='flex justify-center'>
          <button className='flex justify-center bg-red-500 text-3xl' onClick={()=>{
                          toast.dismiss()
                          toast((t)=>(
                              <div className='text-2xl text-white'>
                                  <p>¿Ocultar? {Eloboost.titulo}</p>
                                  <button className='bg-red-500 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                                      axios.put(`/eloboosts/${Eloboost._id}`,{id_booster:localStorage.getItem("IdUsuario")+"IDVIEJO"},{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                                      .then(res =>{
                                          console.log(res)
                                          if(res.status===200){
                                              toast.dismiss()
                                              toast.success("Se ha eliminado el Eloboost con exito")
                                          }
                                      })
                                      .catch(error=>{
                                          console.log(error)
                                          if(error.response.status===404){
                                              toast.error("El Eloboost ha sido borrado y no se encuentra ")
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
                                  }}>Ocultar </button>
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
        <p>ID: {Eloboost._id}</p>
        <p>Titulo: {Eloboost.titulo}</p>
        <p>Liga Inicial: {Eloboost.liga_inicio}</p>
        <p>Liga Deseada: {Eloboost.liga_deseada}</p>
        <p>Precio: {Eloboost.precio}€</p>
        <p>Rol Preferido: {Eloboost.rol_preferido}</p>
        <p>ID Booster: {Eloboost.id_booster}</p>
        <p>ID Cliente: {Eloboost.id_cliente}</p>
        <p>Nombre Invocador: {Eloboost.nombre_cuenta}</p>
        <p>Contraseña Cuenta: {Eloboost.passwd_cuenta}</p>
        <p>Campeon Preferido: {Eloboost.campeon_preferido}</p>
        <div className='flex justify-center'>
          <button className='flex justify-center bg-indigo-500 text-3xl' onClick={()=>{
              navigate(`/actualizarboost/${Eloboost._id}`)
          }}>Editar</button>
        </div>
      </div>
    )
  }
  
}

export default TarjetaUsuariosEloboosts