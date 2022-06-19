import React from 'react'

function TarjetaUsuariosCuentas({Cuentas}) {
  return (
    <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
    hover:bg-zinc-700 hover:cursor-pointer'>
      <h1>Id: {Cuentas._id}</h1>
      <p>Titulo: {Cuentas.titulo}</p>
      <p>Correo de la cuenta:<br></br>{Cuentas.correo_cunta}</p>
      <p>Servidor: {Cuentas.servidor}</p>
      <p>Numero de Campeones: {Cuentas.Campeones}</p>
      <p>Numero de Aspectos: {Cuentas.aspectos}</p>
      <p>Rango Temporada Pasada<br></br>{Cuentas.rango_temporada_pasada}</p>
      <p>Riot Points: {Cuentas.riot_points}</p>
      <p>Esencia Azul: {Cuentas.esencia_azul}</p>
      <p>Contraseña cuenta: {Cuentas.contraseña_cuenta}</p>
      <p>Nombre de Invocador: {Cuentas.nombre_invocador}</p>
      <p>ID Comprador:<br></br>
      {Cuentas.id_comprador}</p>
      <p>ID Vendedor:<br></br>{Cuentas.id_vendedor}</p>
      <p>Precio: {Cuentas.precio}€</p>
    </div>
  )
}

export default TarjetaUsuariosCuentas