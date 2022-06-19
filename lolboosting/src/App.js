import './App.css';
import {Aterrizaje,Login,NotFound, Registrarse, Vercuentas, Vercuenta,
  CrearCuenta, ModificarCuenta, Perfil, ModificarPerfil, CrearSolicitud,VerTodoslosBoosts,
  VerBoost, ActualizarBoost, CrearBoostMaestria, VerTodasLasMaestrias, VerMaestria, PasarSaldo, ActualizarMaestria,
  CrearCoachings, VerCoach, VerCoachs, EditarCoach,
  CrearProducto, VerProducto, VerTodoslosProductos, EditarProducto,
  Dashboard, Añadiradmin, Verusuarios, AdminCuentas, AdminMaestrias, Admincoachings, Admineloboosts,
  UsuarioCoachings, UsuarioCuentas, UsuarioEloboosts, UsuarioMaestrias, Carrito} from './Paginas/index'
import {Routes, Route, Link} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    
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

    </>
  );
}

export default App;
