
import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function TarjetasBoosts({Boost}) {
  const navigate = useNavigate()
    return (
        <>
        <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
        hover:bg-zinc-700 hover:cursor-pointer'>
        <div className='px-4 py-7'>
        <h4 className='flex justify-center text-2xl'>{Boost.titulo}</h4>
         
          
          <p>Rol / Roles Preferidos: {Boost.rol_preferido}</p>
          <p>Precio: {Boost.precio}€</p>
          <div className='flex justify-center'>
          <button className='bg-orange-600 text-xl px-2 py-1 rounded-sm' onClick={()=>{ navigate(`/boost/${Boost._id}`)}}>Ver Detalles</button>
          </div>
        </div>
        </div>
        </>
      )
}
