import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function TarjetaUsuariosMaestrias({Maestrias}) {
  const navigate = useNavigate()
  if(localStorage.getItem("IdUsuario")==Maestrias.id_cliente && Maestrias.id_booster!==""){
    return (
      <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
      hover:bg-zinc-700 hover:cursor-pointer'>
        <p className='flex justify-center'>ID: {Maestrias._id}</p>
        <p className='flex justify-center'>Titulo: {Maestrias.titulo}</p>
        <p className='flex justify-center'>Campeon: {Maestrias.campeon}</p>
        <p className='flex justify-center'>Nivel de Maestria Actual: {Maestrias.nivel_maestria_actual}</p>
        <p className='flex justify-center'>Nivel de Maestria Deseado: {Maestrias.maestria_deseada}</p>
        <p className='flex justify-center'>Precio: {Maestrias.precio}€</p>
        <p className='flex justify-center'>Nombre Invocador: {Maestrias.nombre_cuenta}</p>
        <p className='flex justify-center'>Contraseña Cuenta: {Maestrias.passwd_cuenta}</p>
        <p className='flex justify-center'>ID Booster: {Maestrias.id_booster}</p>
        <p className='flex justify-center'>ID Cliente: {Maestrias.id_cliente}</p>
        <div className='flex justify-center'>
          <button className='flex justify-center bg-red-500 text-3xl' onClick={()=>{
                          toast.dismiss()
                          toast((t)=>(
                              <div className='text-2xl text-white'>
                                  <p>¿Eliminar? {Maestrias.titulo}</p>
                                  <button className='bg-red-500 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                                      axios.delete(`/maestrias/${Maestrias._id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                                      .then(res =>{
                                          console.log(res)
                                          if(res.status===204){
                                              toast.dismiss()
                                              toast.success("Se ha eliminado la Maestria con exito")
                                          }
                                      })
                                      .catch(error=>{
                                          console.log(error)
                                          if(error.response.status===404){
                                              toast.error("La Maestria ha sido borrada y no se encuentra ")
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
  }else if(localStorage.getItem("IdUsuario")==Maestrias.id_booster && Maestrias.id_cliente!==""){
    return (
      <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
      hover:bg-zinc-700 hover:cursor-pointer'>
        <p className='flex justify-center'>ID: {Maestrias._id}</p>
        <p className='flex justify-center'>Titulo: {Maestrias.titulo}</p>
        <p className='flex justify-center'>Campeon: {Maestrias.campeon}</p>
        <p className='flex justify-center'>Nivel de Maestria Actual: {Maestrias.nivel_maestria_actual}</p>
        <p className='flex justify-center'>Nivel de Maestria Deseado: {Maestrias.maestria_deseada}</p>
        <p className='flex justify-center'>Precio: {Maestrias.precio}€</p>
        <p className='flex justify-center'>Nombre Invocador: {Maestrias.nombre_cuenta}</p>
        <p className='flex justify-center'>Contraseña Cuenta: {Maestrias.passwd_cuenta}</p>
        <p className='flex justify-center'>ID Booster: {Maestrias.id_booster}</p>
        <p className='flex justify-center'>ID Cliente: {Maestrias.id_cliente}</p>
        <div className='flex justify-center'>
          <button className='flex justify-center bg-red-500 text-3xl' onClick={()=>{
                          toast.dismiss()
                          toast((t)=>(
                              <div className='text-2xl text-white'>
                                  <p>¿Ocultar? {Maestrias.titulo}</p>
                                  <button className='bg-red-500 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                                      axios.put(`/maestrias/${Maestrias._id}`,{id_booster:localStorage.getItem("IdUsuario")+"IDVIEJO"},{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                                      .then(res =>{
                                          console.log(res)
                                          if(res.status===200){
                                              toast.dismiss()
                                              toast.success("Se ha ocultado la Maestria con exito")
                                          }
                                      })
                                      .catch(error=>{
                                          console.log(error)
                                          if(error.response.status===404){
                                              toast.error("La Maestria ha sido borrada y no se encuentra ")
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
        <p className='flex justify-center'>ID: {Maestrias._id}</p>
        <p className='flex justify-center'>Titulo: {Maestrias.titulo}</p>
        <p className='flex justify-center'>Campeon: {Maestrias.campeon}</p>
        <p className='flex justify-center'>Nivel de Maestria Actual: {Maestrias.nivel_maestria_actual}</p>
        <p className='flex justify-center'>Nivel de Maestria Deseado: {Maestrias.maestria_deseada}</p>
        <p className='flex justify-center'>Precio: {Maestrias.precio}€</p>
        <p className='flex justify-center'>Nombre Invocador: {Maestrias.nombre_cuenta}</p>
        <p className='flex justify-center'>Contraseña Cuenta: {Maestrias.passwd_cuenta}</p>
        <p className='flex justify-center'>ID Booster: {Maestrias.id_booster}</p>
        <p className='flex justify-center'>ID Cliente: {Maestrias.id_cliente}</p>
        <div className='flex justify-center'>
          <button className='flex justify-center bg-indigo-500 text-3xl' onClick={()=>{
            navigate(`/actualizarmaestria/${Maestrias._id}`)
          }}>Editar</button>
        </div>
      </div>
    )
  }

}

export default TarjetaUsuariosMaestrias