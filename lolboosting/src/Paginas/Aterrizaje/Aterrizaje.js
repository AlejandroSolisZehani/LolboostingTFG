
import {Link} from 'react-router-dom'


export default function Aterrizaje() {

    
  return (
      <>
      <div>
        Aterrizaje
      <Link to='aadasd' className="text-black-100 block">Go to 404</Link>
      <Link to='/miperfil' className="text-black-100 block">mi perfil</Link>
      <Link to='/productos' className="text-black-100 block">productos</Link>
      <Link to='/boost' className="text-black-100 block">boosts</Link>
      <Link to='/maestrias' className="text-black-100 block">maestrias</Link>
      <Link to='/login' className="text-black-100 block">login</Link>
      <Link to='/signup' className="text-black-100 block">registrarse</Link>
      <Link to='/cuentas' className="text-black-100 block">cuentas</Link>
      </div>
    </>
  )
}
