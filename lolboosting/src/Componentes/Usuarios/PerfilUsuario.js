import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export function PerfilUsuario({Perfil}) {
  const navigate = useNavigate()
  const pasarsaldo = (t) =>{
    axios.put(`/usuarios/${localStorage.getItem("IdUsuario")}`,{saldo:0},{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                  .then(res => {
                    if(res.status===200){
                      toast.success("Saldo transferido")
                      toast.dismiss(t.id)
                      alert("Se ha enviado correctamente, Recargue la pagina")
                    }
                  })
                  .then(res=> navigate("/miperfil"))
                  .catch(error => console.log(error))
                  navigate("/miperfil")
  }
  function transferir(){
    if(Perfil.saldo>0){
      toast((t) =>(
        <div className='text-xl text-white'>
            <p>¿Desea Transferir saldo? <strong>{Perfil.saldo}€</strong></p>
            <br></br>
            <div>
                <button className='bg-red-500 hover:bg-red-500 px-3 py-2 rounded-sm mx-2' onClick={()=>pasarsaldo(t)}>Enviar</button>
                <button className='bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2' onClick={()=>{toast.dismiss(t.id)}}>Cancelar</button>
            </div>
        </div>
    ),{
        style: {
            background: "#202020"
        }
    })
    }else{
      toast.error("Tienes que tener algo de Saldo para realizar esta operacion")
    }
    
  }
  return (
    <>
    <div className='flex justify-center mb-6 mt-2 text-light-200'>
       <div><img src={Perfil.url_imagen} alt='Imagen de perfil' className='rounded-full mt-2 mb-2'/></div>
    </div>
    <div className='flex justify-center text-3xl mt-3 mb-6'>
      <p className='hover:bg-stone-600'>Nombre de Usuario<br></br>
      <strong className=''>
        {Perfil.nombre_usuario}
      </strong>
      </p>
    </div>

    <div className='flex justify-center text-2xl mt-3 mb-6'>
    <p className='hover:bg-stone-600'>Saldo disponible en Cuenta<br></br>
      <strong className=''>
        {Perfil.saldo}€
      </strong>
      </p>
    </div>
    <div className='flex justify-center text-2xl mt-3 mb-6'>
    <p className='hover:bg-stone-600'>Numero de Telefono<br></br>
      <strong className=''>
        {Perfil.telefono_usuario}
      </strong>
      </p>
    </div>
    <div className='flex justify-center text-2xl mt-3 mb-6 w-full'>
    <p className='hover:bg-stone-600'>Correo Usuario<br></br>
      <strong className='p-4'>
        {Perfil.email_usuario}
      </strong>
      </p>
    </div>
    <div className='flex justify-center text-2xl mt-3 mb-6'>
    <p className='hover:bg-stone-600'>Direccion<br></br>
      <strong className=''>
        {Perfil.direccion}
      </strong>
      </p>
    </div>
    <div className='flex justify-center text-2xl mt-3 mb-6'>
    <button className='bg-blue-600 hover:bg-blue-400' onClick={()=>{navigate("/modificarperfil")}}>Editar</button>
    <button onClick={()=>transferir()} className='bg-red-600 hover:bg-red-400'>Transferir Saldo</button>
    </div>
    </>
  )
}
