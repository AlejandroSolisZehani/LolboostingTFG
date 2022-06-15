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
      <h4>{cuentadatos._id}</h4>
      </div>
      <h1>{cuentadatos.id_vendedor}</h1>
      <p>{cuentadatos.servidor}€</p>
      <div>
        <button className='bg-red-700 text-xl px-2 py-1 rounded-sm hover:bg-red-400' onClick={()=>{alert("Comprado")}}>Comprar</button>
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
