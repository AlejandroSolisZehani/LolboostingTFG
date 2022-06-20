import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function TarjetasCoachs({Coachings}) {
  const navigate = useNavigate()
  return (
    <>
    <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
    hover:bg-zinc-700 hover:cursor-pointer'>
    <div className='px-4 py-7'>
      <div className='flex justify-center'>
      <h4 className='text-2xl'>Rango del Coach: {Coachings.titulo}</h4>
      </div>
      
      <p  className='flex justify-center'>Rol / Roles Dominante: {Coachings.roles_preferidos}</p>
      <p  className='flex justify-center'>Partidas: {Coachings.partidas}</p>
      <p  className='flex justify-center'>Precio: {Coachings.precio}€</p>
      <div className='flex justify-center'>
      <button className='bg-orange-600 text-xl px-2 py-1 rounded-sm' onClick={()=>{ navigate(`/coachings/${Coachings._id}`)}}>Ver Detalles</button>
      </div>
    </div>
    </div>
    </>
  )
}
