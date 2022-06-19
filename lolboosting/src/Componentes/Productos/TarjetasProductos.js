import React from 'react'

function TarjetasProductos({Productos}) {
  return (
    <>
    <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
    hover:bg-zinc-700 hover:cursor-pointer'>
    <div className='px-4 py-7'>
      <div className='flex justify-between'>
      <h4>{Productos._id}</h4>
      <button className='bg-red-600 text-xl px-2 py-1 rounded-sm' onClick={()=>{ window.location.href=`/productos/${Productos._id}`}}>Ver Detalles</button>
      </div>
      
      <p>{Productos.titulo}</p>
      <p>{Productos.detalles}</p>
      <img src={Productos.imagenes} alt={Productos.titulo}/>
      <p>{Productos.precio}€</p>
    </div>
    </div>
    </>
  )
}

export default TarjetasProductos