import React from 'react'

function TarjetaUsuariosMaestrias({Maestrias}) {
  return (
    <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
    hover:bg-zinc-700 hover:cursor-pointer'>
      <p>ID: {Maestrias._id}</p>
      <p>Titulo: {Maestrias.titulo}</p>
      <p>Campeon: {Maestrias.campeon}</p>
      <p>Nivel de Maestria Actual: {Maestrias.nivel_maestria_actual}</p>
      <p>Nivel de Maestria Deseado: {Maestrias.maestria_deseada}</p>
      <p>Precio: {Maestrias.precio}€</p>
      <p>Nombre Invocador: {Maestrias.nombre_cuenta}</p>
      <p>Contraseña Cuenta: {Maestrias.passwd_cuenta}</p>
      <p>ID Booster: {Maestrias.id_booster}</p>
      <p>ID Cliente: {Maestrias.id_cliente}</p>
    </div>
  )
}

export default TarjetaUsuariosMaestrias