import React from 'react'

export default function TarjetasCoachs({Coachings}) {
  return (
    <>
    <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
    hover:bg-zinc-700 hover:cursor-pointer'>
    <div className='px-4 py-7'>
      <div className='flex justify-between'>
      <h4>{Coachings._id}</h4>
      <button className='bg-red-600 text-xl px-2 py-1 rounded-sm' onClick={()=>{ window.location.href=`/coachings/${Coachings._id}`}}>Ver Detalles</button>
      </div>
      
      <p>{Coachings.titulo}</p>
      <p>{Coachings.partidas} Partidas</p>
      <p>{Coachings.precio}€</p>
    </div>
    </div>
    </>
  )
}
