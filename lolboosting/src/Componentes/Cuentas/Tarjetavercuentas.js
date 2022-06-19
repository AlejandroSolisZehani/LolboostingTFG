import React from 'react'
import { useNavigate } from 'react-router-dom'
export function Tarjetavercuentas({cuentadatos}) {
  const navigate = useNavigate()
  return (
    <>
    <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
    hover:bg-zinc-700 hover:cursor-pointer'>
    <div className='px-4 py-7'>
      <div className='flex justify-between'>
      <h4>{cuentadatos._id}</h4>
      <button className='bg-red-600 text-xl px-2 py-1 rounded-sm' onClick={()=>{ navigate(`/cuentas/${cuentadatos._id}`)}}>Ver Detalles</button>
      </div>
      
      <p>{cuentadatos.servidor}€</p>
      
    </div>
    </div>
    </>
  )
}

