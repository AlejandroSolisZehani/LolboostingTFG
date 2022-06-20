import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function TarjetaUsuariosCuentas({Cuentas}) {
  const navigate = useNavigate()
  if(localStorage.getItem("IdUsuario")==Cuentas.id_comprador){
    return (
      <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
      hover:bg-zinc-700 hover:cursor-pointer'>
        <h1 className='flex justify-center'>Id:</h1>
        <h1 className='flex justify-center'>{Cuentas._id}</h1>
        <p className='flex justify-center'>Titulo: {Cuentas.titulo}</p>
        <p className='flex justify-center'>Correo de la cuenta:<br></br>{Cuentas.correo_cunta}</p>
        <p className='flex justify-center'>Servidor: {Cuentas.servidor}</p>
        <p className='flex justify-center'>Numero de Campeones: {Cuentas.Campeones}</p>
        <p className='flex justify-center'>Numero de Aspectos: {Cuentas.aspectos}</p>
        <p className='flex justify-center'>Rango Temporada Pasada<br></br>{Cuentas.rango_temporada_pasada}</p>
        <p className='flex justify-center'>Riot Points: {Cuentas.riot_points}</p>
        <p className='flex justify-center'>Esencia Azul: {Cuentas.esencia_azul}</p>
        <p className='flex justify-center'>Contraseña cuenta: {Cuentas.contraseña_cuenta}</p>
        <p className='flex justify-center'>Nombre de Invocador: {Cuentas.nombre_invocador}</p>
        <p className='flex justify-center'>ID Comprador:</p>
        <p className='flex justify-center'>{Cuentas.id_comprador}</p>
        <p className='flex justify-center'>ID Vendedor:<br></br>{Cuentas.id_vendedor}</p>
        <p className='flex justify-center'>Precio: {Cuentas.precio}€</p>
        <div className='flex justify-center'>
        <button className='flex justify-center bg-red-500 text-3xl' onClick={()=>{
                        toast.dismiss()
                        toast((t)=>(
                            <div className='text-2xl text-white'>
                                <p>¿Eliminar? {Cuentas.titulo}</p>
                                <button className='bg-red-500 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                                    axios.delete(`/cuentas/${Cuentas._id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                                    .then(res =>{
                                        console.log(res)
                                        if(res.status===204){
                                            toast.dismiss()
                                            toast.success("Se ha eliminado la cuenta con exito")
                                        }
                                    })
                                    .catch(error=>{
                                        console.log(error)
                                        if(error.response.status===404){
                                            toast.error("La cuenta ha sido borrada y no se encuentra ")
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
      </div></div>
    )
  }else if(localStorage.getItem("IdUsuario")==Cuentas.id_vendedor && Cuentas.id_comprador!=""){
    return (
      <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
      hover:bg-zinc-700 hover:cursor-pointer'>
        <h1 className='flex justify-center'>Id:</h1>
        <h1 className='flex justify-center'>{Cuentas._id}</h1>
        <p className='flex justify-center'>Titulo: {Cuentas.titulo}</p>
        <p className='flex justify-center'>Correo de la cuenta:<br></br>{Cuentas.correo_cunta}</p>
        <p className='flex justify-center'>Servidor: {Cuentas.servidor}</p>
        <p className='flex justify-center'>Numero de Campeones: {Cuentas.Campeones}</p>
        <p className='flex justify-center'>Numero de Aspectos: {Cuentas.aspectos}</p>
        <p className='flex justify-center'>Rango Temporada Pasada<br></br>{Cuentas.rango_temporada_pasada}</p>
        <p className='flex justify-center'>Riot Points: {Cuentas.riot_points}</p>
        <p className='flex justify-center'>Esencia Azul: {Cuentas.esencia_azul}</p>
        <p className='flex justify-center'>Contraseña cuenta: {Cuentas.contraseña_cuenta}</p>
        <p className='flex justify-center'>Nombre de Invocador: {Cuentas.nombre_invocador}</p>
        <p className='flex justify-center'>ID Comprador:</p>
        <p className='flex justify-center'>{Cuentas.id_comprador}</p>
        <p className='flex justify-center'>ID Vendedor:<br></br>{Cuentas.id_vendedor}</p>
        <p className='flex justify-center'>Precio: {Cuentas.precio}€</p>
        <div className='flex justify-center'>
        <button className='flex justify-center bg-red-500 text-3xl' onClick={()=>{
                        toast.dismiss()
                        toast((t)=>(
                            <div className='text-2xl text-white'>
                                <p>¿Ocultar? {Cuentas.titulo}</p>
                                <button className='bg-red-500 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                                    axios.put(`/cuentas/${Cuentas._id}`,{id_vendedor:localStorage.getItem("IdUsuario")+"IDVIEJO"},{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                                    .then(res =>{
                                        console.log(res)
                                        if(res.status===200){
                                            toast.dismiss()
                                            toast.success("Se ha ocultado la cuenta con exito")
                                        }
                                    })
                                    .catch(error=>{
                                        console.log(error)
                                        if(error.response.status===404){
                                            toast.error("La cuenta ha sido borrada y no se encuentra ")
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
      </div></div>
    )
  }else{
    return (
      <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
      hover:bg-zinc-700 hover:cursor-pointer'>
        <h1 className='flex justify-center'>Id:</h1>
        <h1 className='flex justify-center'>{Cuentas._id}</h1>
        <p className='flex justify-center'>Titulo: {Cuentas.titulo}</p>
        <p className='flex justify-center'>Correo de la cuenta:<br></br>{Cuentas.correo_cunta}</p>
        <p className='flex justify-center'>Servidor: {Cuentas.servidor}</p>
        <p className='flex justify-center'>Numero de Campeones: {Cuentas.Campeones}</p>
        <p className='flex justify-center'>Numero de Aspectos: {Cuentas.aspectos}</p>
        <p className='flex justify-center'>Rango Temporada Pasada<br></br>{Cuentas.rango_temporada_pasada}</p>
        <p className='flex justify-center'>Riot Points: {Cuentas.riot_points}</p>
        <p className='flex justify-center'>Esencia Azul: {Cuentas.esencia_azul}</p>
        <p className='flex justify-center'>Contraseña cuenta: {Cuentas.contraseña_cuenta}</p>
        <p className='flex justify-center'>Nombre de Invocador: {Cuentas.nombre_invocador}</p>
        <p className='flex justify-center'>ID Comprador:</p>
        <p className='flex justify-center'>{Cuentas.id_comprador}</p>
        <p className='flex justify-center'>ID Vendedor:<br></br>{Cuentas.id_vendedor}</p>
        <p className='flex justify-center'>Precio: {Cuentas.precio}€</p>
        <div className='flex justify-center text-3xl'>
        <button className='flex justify-center bg-indigo-500' onClick={()=>{
           navigate(`/actualizarcuenta/${Cuentas._id}`)
        }}>Editar</button>
        </div>
        
      </div>
    )
  }
  
}

export default TarjetaUsuariosCuentas