import React from 'react'

function TarjetaUsuariosCoachings({Coachings}) {
  return (
    <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
    hover:bg-zinc-700 hover:cursor-pointer'>
      <div className='flex justify-center'>
        <h1>ID: {Coachings._id}</h1>
      </div>
      <h2 className='flex justify-center'>Titulo: {Coachings.titulo}</h2>
      <p className='flex justify-center'>Servidor: {Coachings.servidor}</p>
      <p className='flex justify-center'>Rol preferido: {Coachings.roles_preferidos}</p>
      <p className='flex justify-center'>Idioma: {Coachings.idioma}</p>
      <p className='flex justify-center'>Partidas: {Coachings.partidas}</p>
      <p className='flex justify-center'>Id de la persona que compro el servicio</p>
      <p className='flex justify-center'>{Coachings.id_cliente}</p>
      <p className='flex justify-center'>Id de la persona que subio el servicio</p>
      <p className='flex justify-center'>{Coachings.id_booster}</p>
      <p className='flex justify-center'>Precio: {Coachings.precio}</p>
      <p className='flex justify-center'>Correo del Coach: {Coachings.correo_coach}</p>
    </div>
  )
}

export default TarjetaUsuariosCoachings