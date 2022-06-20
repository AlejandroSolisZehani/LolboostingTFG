import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

export default function TarjetaBoost({Boost}) {
    const navigate = useNavigate();
    const token=localStorage.getItem("TokenUsuario")
    let idusuarioconectado = localStorage.getItem("IdUsuario")
    let id_cliente = Boost.id_cliente
    console.log(Boost)
    
    
    if(id_cliente!==idusuarioconectado){
        console.log("pep"+id_cliente+"/"+idusuarioconectado)
  return (
    <>
    <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
    hover:bg-zinc-700 hover:cursor-pointer'>
    <div className='px-4 py-7'>
      <div className='flex justify-center'>
      <h4 className='flex justify-center text-2xl'>{Boost.titulo}</h4>
      </div>
      <p className='flex justify-center'>Rol / Roles Preferidos: {Boost.rol_preferido}</p>
      <p className='flex justify-center'>Campeon Preferido: {Boost.campeon_preferido}</p>
      <p className='flex justify-center'>Precio: {Boost.precio}€</p>
      <div className='flex justify-center'>
        <button className='bg-orange-500 text-xl px-2 py-1 rounded-sm hover:bg-orange-400' onClick={()=>{
          let saldoaganar = Boost.precio-Boost.precio/10
          toast((t) =>(
            <div className='text-xl text-white'>
                <p>Si boosteas esta cuenta Ganaras <strong>{saldoaganar}€</strong></p>
                <br></br>
                <div>
                    <button className='bg-orange-500 hover:bg-orange-400 px-3 py-2 rounded-sm mx-2' onClick={(t)=>{
                      axios.put(`/eloboosts/${Boost._id}`,{id_booster:localStorage.getItem("IdUsuario"),activo:false},{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                      .then(res =>{
                        console.log(res)
                        if(res.status===200){
                          let saldocuenta
                          axios.get(`/usuarios/${localStorage.getItem("IdUsuario")}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                          .then(res =>{
                            console.log(res)
                            if(res.status===200){
                              saldocuenta=res.data.saldo
                              saldocuenta+=saldoaganar
                              axios.put(`/usuarios/${localStorage.getItem("IdUsuario")}`,{saldo:saldocuenta},{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                              .then(res =>{
                                console.log(res)
                                if(res.status===200){
                                  toast.dismiss(t.id)
                                  toast.success("Se ha añadido el saldo a tu cuenta. Puedes ver los detalles en Mi Perfil -> Mis Servicios",{duration:5000})
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
        }}>Boostear</button>
      </div>
    </div>
    </div>
    </>
  )
    }else{
        console.log(id_cliente+"/"+idusuarioconectado)
        return (
            <>
            <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
            hover:bg-zinc-700 hover:cursor-pointer'>
            <div className='px-4 py-7'>
              <div className='flex justify-center'>
              <h4>{Boost.titulo}</h4>
              </div>
              <p className='flex justify-center'>Rol / Roles Preferidos: {Boost.rol_preferido}</p>
              <p className='flex justify-center'>Campeon Preferido: {Boost.campeon_preferido}</p>
            <p className='flex justify-center'>Precio: {Boost.precio}€</p>
              <div className='flex justify-center'>
                <button className='bg-blue-800 text-xl px-2 py-1 rounded-sm hover:bg-blue-400' onClick={()=>{navigate(`/actualizarboost/${Boost._id}`)}}>Editar</button>
              </div>
            </div>
            </div>
            </>
          )
        }
}
