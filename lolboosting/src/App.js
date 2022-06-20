import './App.css';
import React, { useState } from 'react';
import {Aterrizaje,Login,NotFound, Registrarse, Vercuentas, Vercuenta,
  CrearCuenta, ModificarCuenta, Perfil, ModificarPerfil, CrearSolicitud,VerTodoslosBoosts,
  VerBoost, ActualizarBoost, CrearBoostMaestria, VerTodasLasMaestrias, VerMaestria, PasarSaldo, ActualizarMaestria,
  CrearCoachings, VerCoach, VerCoachs, EditarCoach,
  CrearProducto, VerProducto, VerTodoslosProductos, EditarProducto,
  Dashboard, Añadiradmin, Verusuarios, AdminCuentas, AdminMaestrias, Admincoachings, Admineloboosts,
  UsuarioCoachings, UsuarioCuentas, UsuarioEloboosts, UsuarioMaestrias, Carrito} from './Paginas/index'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import {AiOutlineClose, AiOutlineMail, AiOutlineMenu} from 'react-icons/ai'
  import {
    FaFacebookSquare,
    FaGithubSquare,
    FaInstagram,
    FaTwitterSquare
  } from 'react-icons/fa'
function App() {
  const [nav, setNav] = useState(false)
  const navigate = useNavigate()
  const handlenav = () =>{
      setNav(!nav)
  }
  return (
    <>
    <div>
    <div className='flex justify-between items-center max-w-[1920px] mx-auto px-4 h-24 text-white bg-black'>
        <Link to='/'><h1 className='w-full text-3xl font-bold m-4'>Lolboosting</h1></Link>
        <ul className='hidden md:flex'>
        <Link to='/productos' className="p-3"> <li className='p-3'>Productos</li></Link>
        <Link to='/cuentas' className="p-3"><li className='p-3' >Cuentas</li></Link>
        <Link to='/boost' className="p-3"><li className='p-3'>Eloboosts</li></Link>
        <Link to='/maestrias' className="p-3"><li className='p-3'>Maestrias</li></Link>
        <Link to='/coachings' className="p-3"><li className='p-3'>Coachings</li></Link>
        <Link to='/carrito' className="p-3"><li className='p-3'>Carrito</li></Link>
        <Link to='/miperfil' className="p-3"><li className='p-3'>Perfil</li></Link>
        </ul>
        <div onClick={handlenav} className='block md:hidden'>
          {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>  }
          
        </div>
        <div className={nav ? 'fixed left-0 top-0 w-[70%] h-full border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-10' : 'fixed left-[-100%] z-10'}>
        <h1 className='w-[70%]text-3xl font-bold m-4 '><Link to='/'>Lolboosting</Link></h1>
          <ul className='p-4 uppercase'>
          <Link to='/productos'> <li className="p-4 border-b border-gra-600">Productos</li></Link>
          <Link to='/cuentas'><li className='p-4 border-b border-gra-600' >Cuentas</li></Link>
          <Link to='/boost'><li className='p-4 border-b border-gra-600'>Eloboosts</li></Link>
          <Link to='/maestrias'><li className='p-4 border-b border-gra-600'>Maestrias</li></Link>
          <Link to='/coachings'><li className='p-4 border-b border-gra-600'>Coachings</li></Link>
          <Link to='/carrito'><li className='p-4 border-b border-gra-600'>Carrito</li></Link>
          <Link to='/miperfil'><li className='p-4 border-b border-gra-600'>Perfil</li></Link>
          </ul>
        </div>
    </div>

    <div className='bg-slate-500 flex items-center'>
      <div className='px-10 container m-auto'>
      <React.StrictMode>
      <Routes>
        <Route path='/' element={<Aterrizaje/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Registrarse/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
        <Route path='/cuentas' element={<Vercuentas/>}></Route>
        <Route path='/cuentas/:id' element={<Vercuenta/>}></Route>
        <Route path='/actualizarcuenta/:id' element={<ModificarCuenta/>}></Route>
        <Route path='/miperfil' element={<Perfil/>}></Route>
        <Route path='/modificarperfil' element={<ModificarPerfil/>}></Route>
        <Route path='/pasarsaldo' element={<PasarSaldo/>}></Route>
        <Route path='/vendercuenta' element={<CrearCuenta/>}></Route>
        <Route path='/eloboost' element={<CrearSolicitud/>}></Route>
        <Route path='/boost' element={<VerTodoslosBoosts/>}></Route>
        <Route path='/boost/:id' element={<VerBoost/>}></Route>
        <Route path='/actualizarboost/:id' element={<ActualizarBoost/>}></Route>
        <Route path='/maestria' element={<CrearBoostMaestria/>}></Route>
        <Route path='/maestrias' element={<VerTodasLasMaestrias/>}></Route>
        <Route path='/maestrias/:id' element={<VerMaestria/>}></Route>
        <Route path='/actualizarmaestria/:id' element={<ActualizarMaestria/>}></Route>
        <Route path='/coach' element={<CrearCoachings/>}></Route>
        <Route path='/coachings' element={<VerCoachs/>}></Route>
        <Route path='/coachings/:id' element={<VerCoach/>}></Route>
        <Route path='/editarcoach/:id' element={<EditarCoach/>}></Route>
        <Route path='/subirproducto' element={<CrearProducto/>}></Route>
        <Route path='/productos' element={<VerTodoslosProductos/>}></Route>
        <Route path='/productos/:id' element={<VerProducto/>}></Route>
        <Route path='/editarproducto/:id' element={<EditarProducto/>}></Route>
        <Route path='/admin' element={<Dashboard/>}></Route>
        <Route path='/admin/nuevoadmin' element={<Añadiradmin/>}></Route>
        <Route path='/admin/verusuarios' element={<Verusuarios/>}></Route>
        <Route path='/admin/vercoachings' element={<Admincoachings/>}></Route>
        <Route path='/admin/vermaestrias' element={<AdminMaestrias/>}></Route>
        <Route path='/admin/vereloboosts' element={<Admineloboosts/>}></Route>
        <Route path='/admin/vercuentas' element={<AdminCuentas/>}></Route>
        <Route path='/miperfil/cuentas' element={<UsuarioCuentas/>}></Route>
        <Route path='/miperfil/coachings' element={<UsuarioCoachings/>}></Route>
        <Route path='/miperfil/eloboosts' element={<UsuarioEloboosts/>}></Route>
        <Route path='/miperfil/maestrias' element={<UsuarioMaestrias/>}></Route>
        <Route path='/carrito' element={<Carrito/>}></Route>
      </Routes>
      </React.StrictMode>
      <Toaster/>
      </div>
      
    </div>
    <div className='max-w-[1920px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300 bg-black md:flex justify-center'>
    <div>
    <h1 className='w-full text-3xl font-bold m-4'>Contacto</h1>
    <p>alejandrosoliszehanitfg@gmail.com</p>
    <p>Copyright © Alejandro Solís Zehani</p>
    <div className=' md:w-[75%] flex justify-between py-6'>
      <FaFacebookSquare size={30}/>
      <FaInstagram size={30}/>
      <FaTwitterSquare size={30}/>
      <FaGithubSquare size={30}/>
      <AiOutlineMail size={30}/>
    </div>
    </div>  
    </div>
    </div>
    </>
  );
}

export default App;
