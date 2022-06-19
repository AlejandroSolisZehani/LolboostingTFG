import React from 'react'

function TarjetaUsuariosEloboosts({Eloboost}) {
  return (
    <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
    hover:bg-zinc-700 hover:cursor-pointer'>
      <p>ID: {Eloboost._id}</p>
      <p>Titulo: {Eloboost.titulo}</p>
      <p>Liga Inicial: {Eloboost.liga_inicio}</p>
      <p>Liga Deseada: {Eloboost.liga_deseada}</p>
      <p>Precio: {Eloboost.precio}€</p>
      <p>Rol Preferido: {Eloboost.rol_preferido}</p>
      <p>ID Booster: {Eloboost.id_booster}</p>
      <p>ID Cliente: {Eloboost.id_cliente}</p>
      <p>Nombre Invocador: {Eloboost.nombre_cuenta}</p>
      <p>Contraseña Cuenta: {Eloboost.passwd_cuenta}</p>
      <p>Campeon Preferido: {Eloboost.campeon_preferido}</p>
    </div>
  )
}

export default TarjetaUsuariosEloboosts