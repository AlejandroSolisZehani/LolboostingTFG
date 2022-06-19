import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
export function Tarjetacuenta({cuentadatos}) {
    const navigate = useNavigate();
    const token=localStorage.getItem("TokenUsuario")
    let idusuarioconectado = localStorage.getItem("IdUsuario")
    let idvendedor = cuentadatos.id_vendedor

    const eliminarcuenta = (_id,tid) =>{
        axios.delete(`/cuentas/${_id}`,{ headers: {"x-access-token" : `${token}`} })
        .then(res=>{
            console.log(res)
            if(res.status===204){
                toast.success("Eliminado exitosamente")
                toast.dismiss(tid)
            }
            navigate('/cuentas')
        })
        .catch(error=>{
            if(error.response.status===404){
                toast.error("No existe la cuenta")
            }else if(error.response.data.message==="jwt expired"){
                toast.error("Sesión Cerrada vuelve a Loggearte")
                localStorage.clear()
                navigate("/login")
            }else{
                toast.error(error.response.data)
            }
        })
    }
    const handleDelete = (_id) =>{
        toast((t) =>(
            <div className='text-xl text-white'>
                <p>¿Desea eliminar la cuenta? <strong>{_id}</strong></p>
                <br></br>
                <div>
                    <button className='bg-red-500 hover:bg-red-500 px-3 py-2 rounded-sm mx-2' onClick={()=>eliminarcuenta(_id,t.id)}>Eliminar</button>
                    <button className='bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2' onClick={()=>{toast.dismiss(t.id)}}>Cancelar</button>
                </div>
            </div>
        ),{
            style: {
                background: "#202020"
            }
        })
    }
    if(idvendedor!==idusuarioconectado){
        console.log(idvendedor+"/"+idusuarioconectado)
  return (
    <>
    <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
    hover:bg-zinc-700 hover:cursor-pointer'>
    <div className='px-4 py-7'>
      <div className='flex justify-between'>
      <h4>{cuentadatos.rango_temporada_actual}</h4>
      </div>
      <h1>{cuentadatos.nivel_cuenta}</h1>
      <p>{cuentadatos.precio}€</p>
      <div>
        <button className='bg-orange-500 text-xl px-2 py-1 rounded-sm hover:bg-orange-400' onClick={()=>{
            if(cuentadatos.id_comprador!==""){
                toast.error("Cuenta ya comprada. En caso de haberla comprado la puedes ver en tu perfil")
            }else{
                toast((t) =>(
                    <div className='text-xl text-white'>
                        <p>¿Desea comprar la cuenta a este precio?" <strong>{cuentadatos.precio}€</strong></p>
                        <br></br>
                        <div>
                            <button className='bg-orange-500 hover:bg-orange-400 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                            
                               axios.put(`/cuentas/${cuentadatos._id}`,{id_comprador:localStorage.getItem("IdUsuario"),activo:false},{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                               .then(res => {
                                console.log(res)
                                if(res.status===200){
                                    axios.get(`/usuarios/${cuentadatos.id_vendedor}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                                    .then(res => {
                                        console.log(res)
                                        if(res.status===200){
                                            let saldovendedor = res.data.saldo
                                            saldovendedor += cuentadatos.precio
                                            axios.put(`/usuarios/${cuentadatos.id_vendedor}`,{saldo:saldovendedor},{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                                            .then(res => {
                                                if(res.status===200){
                                                    toast.dismiss(t.id)
                                                    toast.success("Se ha comprado la cuenta correctamente")
                                                    navigate("/miperfil")
                                                }
                                            })
                                            .catch(error => {
                                                console.log(error)
                                                if(error.response.data.message==="jwt expired"){
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
                                    toast.error("Sesión Cerrada vuelve a Loggearte")
                                    localStorage.clear()
                                    navigate("/login")
                                }else{
                                    toast.error(error.response.data)
                                }
                            })
                           
                            }}>Comprar</button>
                            <button className='bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2' onClick={()=>{toast.dismiss(t.id)}}>Cancelar</button>
                        </div>
                    </div>
                ),{
                    style: {
                        background: "#202020"
                    }
                })
            }
        }}>Comprar</button>
      </div>
    </div>
    </div>
    </>
  )
    }else{
        console.log(idvendedor+"/"+idusuarioconectado)
        return (
            <>
            <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
            hover:bg-zinc-700 hover:cursor-pointer'>
            <div className='px-4 py-7'>
              <div className='flex justify-between'>
              <h4>{cuentadatos._id}</h4>
              </div>
              <h1>{cuentadatos.id_vendedor}</h1>
              <p>{cuentadatos.servidor}€</p>
              <div>
                <button className='bg-red-700 text-xl px-2 py-1 rounded-sm hover:bg-red-400' onClick={()=>handleDelete(cuentadatos._id)}>Eliminar</button>
                <button className='bg-blue-800 text-xl px-2 py-1 rounded-sm hover:bg-blue-400' onClick={()=>{navigate(`/actualizarcuenta/${cuentadatos._id}`)}}>Editar</button>
              </div>
            </div>
            </div>
            </>
          )
    }
}
