import './App.css';
import { useState } from 'react';
import {Aterrizaje,Login,NotFound, Registrarse, Vercuentas, Vercuenta,
  CrearCuenta, ModificarCuenta, Perfil, ModificarPerfil, CrearSolicitud,VerTodoslosBoosts,
  VerBoost, ActualizarBoost, CrearBoostMaestria, VerTodasLasMaestrias, VerMaestria, PasarSaldo, ActualizarMaestria,
  CrearCoachings, VerCoach, VerCoachs, EditarCoach,
  CrearProducto, VerProducto, VerTodoslosProductos, EditarProducto,
  Dashboard, Añadiradmin, Verusuarios, AdminCuentas, AdminMaestrias, Admincoachings, Admineloboosts,
  UsuarioCoachings, UsuarioCuentas, UsuarioEloboosts, UsuarioMaestrias, Carrito} from './Paginas/index'
import {Routes, Route, Link} from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import {AiOutlineClose, AiOutlineMail, AiOutlineMenu} from 'react-icons/ai'
  import {
    FaFacebookSquare,
    FaGithubSquare,
    FaInstagram,
    FaTwitterSquare
  } from 'react-icons/fa'
function App() {
  const [nav, setNav] = useState(false)

  const handlenav = () =>{
      setNav(!nav)
  }
  return (
    <>
    <div>
    <div className='flex justify-between items-center max-w-[1920px] mx-auto px-4 h-24 text-white bg-black'>
        <h1 className='w-full text-3xl font-bold m-4'>Lolboosting</h1>
        <ul className='hidden md:flex'>
          <li className='p-3'>Home</li>
          <li className='p-3'>Cuentas</li>
          <li className='p-3'>Eloboosts</li>
          <li className='p-3'>Maestrias</li>
          <li className='p-3'>Coachings</li>
          <li className='p-3'>Carrito</li>
          <li className='p-3'>Perfil</li>
        </ul>
        <div onClick={handlenav} className='block md:hidden'>
          {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>  }
          
        </div>
        <div className={nav ? 'fixed left-0 top-0 w-[70%] h-full border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold m-4'>Lolboosting</h1>
          <ul className='p-4 uppercase'>
          <li className='p-4 border-b border-gra-600'>Home</li>
          <li className='p-4 border-b border-gra-600'>Cuentas</li>  
          <li className='p-4 border-b border-gra-600'>Eloboosts</li>
          <li className='p-4 border-b border-gra-600'>Maestrias</li>
          <li className='p-4 border-b border-gra-600'>Coachings</li>
          <li className='p-4 border-b border-gra-600'>Carrito</li>
          <li className='p-4 border-b border-gra-600'>Perfil</li>
          </ul>
        </div>
    </div>

    <div className='bg-slate-500 flex items-center'>
   
      <div className='px-10 container m-auto'>
      <Link to='/' className="text-black-100 block">Go to home</Link>
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
      <Toaster/>
      </div>
      
    </div>
    <div className='max-w-[1920px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300 bg-black md:flex justify-center'>
    <div>
    <h1 className='w-full text-3xl font-bold m-4'>Lolboosting</h1>
    <p>CopyRight Alejandro Solis Zehani</p>
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
