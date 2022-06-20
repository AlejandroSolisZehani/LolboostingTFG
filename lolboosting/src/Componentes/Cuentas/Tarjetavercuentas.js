import React from 'react'
import { useNavigate } from 'react-router-dom'
export function Tarjetavercuentas({cuentadatos}) {
  const navigate = useNavigate()
  return (
    <>
    <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
    hover:bg-zinc-700 hover:cursor-pointer'>
    <div className='px-4 py-7'>
     
      <h1 className='flex justify-center text-2xl'>{cuentadatos.titulo}</h1>
      <p className='flex justify-center'>Servidor: {cuentadatos.servidor}</p>
      <p className='flex justify-center'>Precio: {cuentadatos.precio}€</p>
    </div>
    <div className='flex justify-center'>
      <button className='bg-orange-600 text-xl px-2 py-1 rounded-sm mb-10' onClick={()=>{ navigate(`/cuentas/${cuentadatos._id}`)}}>Ver Detalles</button>
    </div>
    </div>
    </>
  )
}

