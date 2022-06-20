import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function TarjetaCoach({Coach}) {
    const navigate = useNavigate()
    if(Coach.id_booster!==localStorage.getItem("IdUsuario")){
        return (
            <>
            <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
            hover:bg-zinc-700 hover:cursor-pointer'>
            <div className='px-4 py-7'>
              <div className='flex justify-center text-2xl'>
              <h4>{Coach.titulo}</h4>
              </div>
              <p className='flex justify-center'>Numero de Partidas: {Coach.partidas} </p>
            <p className='flex justify-center'>Idioma: {Coach.idioma}</p>
            <p className='flex justify-center'>Servidor: {Coach.servidor}</p>
            <p className='flex justify-center'>Rol / Roles Dominantes: {Coach.roles_preferidos}</p>
            <p className='flex justify-center'>Precio: {Coach.precio}€</p>
              <div className='flex justify-center'>
                <button className='bg-orange-500 text-xl px-2 py-1 rounded-sm hover:bg-orange-400' onClick={()=>{
                  let saldoaganar = Coach.precio-Coach.precio/10
                  toast((t) =>(
                    <div className='text-xl text-white'>
                        <p>¿Quieres comprar el servicio por? <strong>{Coach.precio}€</strong></p>
                        <br></br>
                        <div>
                            <button className='bg-orange-500 hover:bg-orange-400 px-3 py-2 rounded-sm mx-2' onClick={(t)=>{
                              axios.put(`/coachings/${Coach._id}`,{id_cliente:localStorage.getItem("IdUsuario"),activo:false},{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                              .then(res =>{
                                console.log(res)
                                if(res.status===200){
                                  let saldocuenta
                                  axios.get(`/usuarios/${Coach.id_booster}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                                  .then(res =>{
                                    console.log(res)
                                    if(res.status===200){
                                      saldocuenta=res.data.saldo
                                      saldocuenta+=saldoaganar
                                      axios.put(`/usuarios/${Coach.id_booster}`,{saldo:saldocuenta},{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                                      .then(res =>{
                                        console.log(res)
                                        if(res.status===200){
                                          toast.dismiss()
                                          toast.success("Se ha añadido el servicio a tu cuenta. Puedes ver los detalles en Mi Perfil -> Mis Servicios",{duration:5000})
                                          navigate("/miperfil")
                                        }
                                      })
                                      .catch(error => {
                                    console.log(error)
                                    if(error.response.data.message==="jwt expired"){
                                      toast.dismiss(t.id)
                                      toast.error("Sesión Cerrada vuelve a Loggearte")
                                      localStorage.clear()
                                      navigate("/login")
                                  }else{
                                    toast.error(error.response.data)
                                  }
                                  })
                                      
                                    }
                                  })
                                  .catch(error => {
                                    console.log(error)
                                    if(error.response.data.message==="jwt expired"){
                                      toast.dismiss(t.id)
                                      toast.error("Sesión Cerrada vuelve a Loggearte")
                                      localStorage.clear()
                                      navigate("/login")
                                  }else{
                                    toast.error(error.response.data)
                                  }
                                  })
                                }
                              })
                              .catch(error => {
                                console.log(error)
                                if(error.response.data.message==="jwt expired"){
                                  toast.dismiss(t.id)
                                  toast.error("Sesión Cerrada vuelve a Loggearte")
                                  localStorage.clear()
                                  navigate("/login")
                              }else{
                                toast.error(error.response.data)
                              }
                              })
                            }}>Aceptar</button>
                            <button className='bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2' onClick={()=>{toast.dismiss(t.id)}}>Cancelar</button>
                        </div>
                    </div>
                ),{
                    style: {
                        background: "#202020"
                    }
                })
                }}>Contratar Coach</button>
              </div>
            </div>
            </div>
            </>
          )
    }else{
        return (
            <>
            <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
            hover:bg-zinc-700 hover:cursor-pointer'>
            <div className='px-4 py-7'>
              <div className='flex justify-center 2xl'>
              <h4>{Coach.titulo}</h4>
              </div>
              <p className='flex justify-center text-xs'>{Coach.correo_coach} </p>
              <p className='flex justify-center'>Numero de Partidas: {Coach.partidas} </p>
              <p className='flex justify-center'>Idioma: {Coach.idioma}</p>
            <p className='flex justify-center'>Servidor: {Coach.servidor}</p>
            <p className='flex justify-center'>Rol / Roles Dominantes: {Coach.roles_preferidos}</p>
            <p className='flex justify-center'>Precio: {Coach.precio}€</p>
              <div className='flex justify-center'>
                <button className='bg-blue-800 text-xl px-2 py-1 rounded-sm hover:bg-blue-400' onClick={()=>{
                  if(Coach.id_booster===localStorage.getItem("IdUsuario")){
                    navigate(`/editarcoach/${Coach._id}`)
                  }else{
                    navigate("/coachings")
                    toast.error("No puedes editar")
                  }
                  }}>Editar</button>
              </div>
            </div>
            </div>
            </>
          )
    }

}

export default TarjetaCoach