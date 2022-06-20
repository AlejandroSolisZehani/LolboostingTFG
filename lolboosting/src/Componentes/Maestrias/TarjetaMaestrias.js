
import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function TarjetaMaestrias({Maestria}) {
  const navigate = useNavigate()
    return (
        <>
        <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
        hover:bg-zinc-700 hover:cursor-pointer'>
        <div className='px-4 py-7'>
          <div className='flex justify-center'>
          <h4 className='flex justify-center text-xl'>{Maestria.campeon}</h4>
          
          </div>
          
          <p className='flex justify-center'>{Maestria.titulo}</p>
          <p className='flex justify-center'>Precio: {Maestria.precio}€</p>
          <div className='flex justify-center'>
          <button className='bg-orange-600 text-xl px-2 py-1 rounded-sm' onClick={()=>{ navigate(`/maestrias/${Maestria._id}`)}}>Ver Detalles</button>
          </div>
        </div>
        </div>
        </>
      )
}