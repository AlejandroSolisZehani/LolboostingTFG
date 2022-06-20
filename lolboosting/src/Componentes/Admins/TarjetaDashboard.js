import React from 'react'
import { useNavigate } from 'react-router-dom'
function TarjetaDashboard() {
    const navigate = useNavigate()
    return <>
    <div className='flex justify-center text-3xl mt-3 mb-6'>
      <div><p className='hover:bg-stone-600'>Bienvenido al DashBoard Admin<br></br>

      </p></div>
     
      
    </div>
    <div className='flex justify-center text-3xl'>
      ¿Que administramos ahora?
    </div>

      <div className='flex justify-center text-3xl  px-2 py-2 ml-10 mr-10 text-black'>
      <button onClick={()=>{navigate("/admin/nuevoadmin")}} className='bg-blue-300 px-5 py-5'>Añadir Admin</button>
    </div>
    <div className='flex justify-center text-3xl  px-2 py-2 ml-10 mr-10 mt-5 mb-5'>
    <h1>Productos</h1>
    </div>
    
    <div className='flex justify-center  text-3xl px-2 py-2 ml-10 mr-10 text-black'>
        
      <button onClick={()=>{navigate("/subirproducto")}} className='bg-green-300 px-5 py-5 mr-2'>Añadir Productos</button>
    </div>
    <div className='flex justify-center  text-3xl px-2 py-2 ml-10 mr-10 text-black'>
      <button onClick={()=>{navigate("/productos")}} className='bg-orange-300 px-5 py-5 ml-2'>Ver Productos</button>
    </div>
    <div className='flex justify-center text-3xl  px-2 py-2 ml-10 mr-10 mt-5 mb-5'>
    <h1>Usuarios</h1>
    </div>
    
    <div className='flex justify-center  text-3xl px-2 py-2 ml-10 mr-10 text-black'>
        
      <button onClick={()=>{navigate("/admin/verusuarios")}} className='bg-orange-300 px-5 py-5 ml-2'>Ver Usuarios</button>
    </div>
    <div className='flex justify-center text-3xl  px-2 py-2 ml-10 mr-10 mt-5 mb-5'>
    <h1>Cuentas</h1>
    </div>
    
    <div className='flex justify-center  text-3xl px-2 py-2 ml-10 mr-10 text-black'>
        
      <button onClick={()=>{navigate("/admin/vercuentas")}} className='bg-orange-300 px-5 py-5 ml-2'>Ver Cuentas</button>
    </div>
    <div className='flex justify-center text-3xl  px-2 py-2 ml-10 mr-10 mt-5 mb-5'>
    <h1>Maestrias</h1>
    </div>
    
    <div className='flex justify-center  text-3xl px-2 py-2 ml-10 mr-10 text-black'>
        
      <button onClick={()=>{navigate("/admin/vermaestrias")}} className='bg-orange-300 px-5 py-5 ml-2'>Ver Maestrias</button>
    </div>
    <div className='flex justify-center text-3xl  px-2 py-2 ml-10 mr-10 mt-5 mb-5'>
    <h1>Coachings</h1>
    </div>
    
    <div className='flex justify-center  text-3xl px-2 py-2 ml-10 mr-10 text-black'>
        
      <button onClick={()=>{navigate("/admin/vercoachings")}} className='bg-orange-300 px-5 py-5 ml-2'>Ver Coachings</button>
    </div>
    <div className='flex justify-center text-3xl  px-2 py-2 ml-10 mr-10 mt-5 mb-5'>
    <h1>Eloboosts</h1>
    </div>
    
    <div className='flex justify-center  text-3xl px-2 py-2 ml-10 mr-10 text-black'>
        
      <button onClick={()=>{navigate("/admin/vereloboosts")}} className='bg-orange-300 px-5 py-5 ml-2'>Ver Eloboosts</button>
    </div>
    </>
}

export default TarjetaDashboard