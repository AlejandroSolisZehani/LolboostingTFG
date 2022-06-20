import React from 'react'
import { useNavigate } from 'react-router-dom'

function TarjetasProductos({Productos}) {
  const navigate = useNavigate()
  return (
    <>
    <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
    hover:bg-zinc-700 hover:cursor-pointer'>
    <div className='px-4 py-7'>
      <div className='flex justify-center'>
      <h4>{Productos.titulo}</h4>
      
      </div>
      <p  className='flex justify-center'>Descripcion: <br></br>{Productos.detalles}</p>
      <div className='flex justify-center'>
      <img src={Productos.imagenes} alt={Productos.titulo}  className='w-96'/>
      </div>
      <p  className='flex justify-center'>Precio: {Productos.precio}€</p>
      <div className='flex justify-center '>
      <button className='bg-orange-600 text-xl px-2 py-1 rounded-sm ' onClick={()=>{ navigate(`/productos/${Productos._id}`)}}>Ver Detalles</button>
      </div>
      
    </div>
    </div>
    </>
  )
}

export default TarjetasProductos