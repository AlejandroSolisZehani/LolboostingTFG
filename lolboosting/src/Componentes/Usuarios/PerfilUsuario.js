import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, Navigate } from 'react-router-dom'
export function PerfilUsuario({Perfil}) {
  const navigate = useNavigate()
  const [Usuario, setUsuario] = useState([])
  const servicios = () =>{
    toast.dismiss()
    toast((t)=>(
      <div className='text-white px-6 py-6 text-2xl'>
         <h1>Hola {Perfil.nombre_usuario}</h1>
         <p>¿Que quieres consultar?</p>
         <div className='grid grid-cols-1 gap-2'>
            <button className='bg-slate-400 px-3 py-3 mt-3' onClick={()=>{navigate('/miperfil/cuentas')
             toast.dismiss()}}>Cuentas</button>
            <button className='bg-slate-400 px-3 py-3 mt-1'onClick={()=>{navigate('/miperfil/coachings')
          toast.dismiss()}}>Coachings</button>
         </div>
         <div className='grid grid-cols-1 gap-2'>
            <button className='bg-slate-400 px-3 py-3 mt-3' onClick={()=>{navigate('/miperfil/eloboosts')
          toast.dismiss()}}>Eloboosts</button>
            <button className='bg-slate-400 px-3 py-3 mt-3' onClick={()=>{navigate('/miperfil/maestrias')
          toast.dismiss()}}>Maestrias</button>
         </div>
         <div className='flex justify-center'>
         <button onClick={()=>{toast.dismiss(t.id)}} className='bg-red-500 px-12 py-4 mt-5 flex justify-center'>Cancelar</button>
         </div>
         
      </div>
    ),{
      style:{
        background: "#202020"
      }
    })
  }
  useEffect(()=>{
    axios.get(`/usuarios/${Perfil._id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
    .then(res=>{
      console.log(res)
      if(res.status===200){
        setUsuario(res.data)
      }
    })
    .catch(error=>{
      console.log(error)
    })
  },[])
  function transferir(){
    if(Perfil.saldo>0){
      toast((t) =>(
        <div className='text-xl text-white'>
            <p>¿Desea Transferir saldo?</p>
            <br></br>
            <div>
                <button className='bg-red-500 hover:bg-red-500 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                  navigate("/pasarsaldo")
                  toast.dismiss(t.id)
                  /*axios.put(`/usuarios/${localStorage.getItem("IdUsuario")}`,{saldo:0},{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                  .then(res => {
                    if(res.status===200){
                      toast.success("Saldo transferido")
                      toast.dismiss(t.id)
                      alert("Se ha enviado correctamente, Recargue la pagina")
                      navigate("/miperfil")
                    }
                  })
                  .catch(error => console.log(error))*/
                }}>Aceptar</button>
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
  console.log(Usuario)
  if(Perfil.roles=="Usuario"){
    return (
      <>
      <div className='flex justify-center mb-6 mt-3 text-light-200'>
         <div><img src={Perfil.url_imagen} alt='Imagen de perfil' className='rounded-full mt-2 mb-2'/></div>
      </div>
      <div className='flex justify-center text-2xl mt-3 mb-6'>
      <button className='bg-red-600 hover:bg-red-500 px-3 py-3' onClick={()=>{
        localStorage.clear()
        navigate("/")
        toast.success("Se ha cerrado la sesión",{style:{background:"#5cfaff"}})
        }}>Cerrar Sesión</button>
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
      <div className='flex justify-center mt-3 mb-6 w-full'>
      <p className='hover:bg-stone-600'>Correo Usuario<br></br>
        <strong >
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
      <button className='bg-blue-600 hover:bg-blue-400 px-3 py-3' onClick={()=>{navigate("/modificarperfil")}}>Editar</button>
      </div>
      <div className='flex justify-center text-2xl mt-3 mb-6'>
      <button onClick={()=>transferir()} className='bg-red-600 hover:bg-red-400 px-3 py-3'>Transferir Saldo</button>
      </div>
      <div className='flex justify-center text-2xl mt-3 mb-6'>
        <button className='bg-blue-300 px-3 py-3' onClick={()=>{servicios()}}>Ver mis servicios / cuentas</button>
      </div>
      </>
    )
  }else{
    return (
      <>
      <div className='flex justify-center mb-6 mt-2 text-light-200'>
         <div><img src={Perfil.url_imagen} alt='Imagen de perfil' className='rounded-full mt-2 mb-2'/></div>
      </div>
      <div className='flex justify-center text-3xl mt-3 mb-6'>
        <button className='bg-green-400 px-3 py-3' onClick={()=>{navigate("/admin")}}>Panel de Admins</button>
      </div>
      <div className='flex justify-center text-2xl mt-3 mb-6'>
      <button className='bg-red-600 hover:bg-red-500 px-3 py-3' onClick={()=>{
        localStorage.clear()
        navigate("/")
        toast.success("Se ha cerrado la sesión",{style:{background:"#5cfaff"}})
        }}>Cerrar Sesión</button>
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
        <strong>
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
      <button className='bg-blue-600 hover:bg-blue-400 px-3 py-3' onClick={()=>{navigate("/modificarperfil")}}>Editar</button>
      </div>
      <div className='flex justify-center text-2xl mt-3 mb-6'>
      <button onClick={()=>transferir()} className='bg-red-600 hover:bg-red-400 px-3 py-3'>Transferir Saldo</button>
      </div>
      <div className='flex justify-center text-2xl mt-3 mb-6'>
        <button className='bg-blue-300 px-3 py-3' onClick={()=>{servicios()}}>Ver mis servicios / cuentas</button>
      </div>

      </>
    )
  }

}
