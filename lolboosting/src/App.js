import './App.css';
import {Aterrizaje,Login,NotFound, Registrarse, VerUsuarios, Vercuentas, Vercuenta,
  CrearCuenta, ModificarCuenta, Perfil, ModificarPerfil, CrearSolicitud,VerTodoslosBoosts,
  VerBoost, ActualizarBoost} from './Paginas/index'
import {Routes, Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    
    <div className='bg-slate-500 flex items-center'>
   
      <div className='px-10 container m-auto'>
      
      <Routes>
        <Route path='/' element={<Aterrizaje/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Registrarse/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
        <Route path='/admin/seeusers' element={<VerUsuarios/>}></Route>
        <Route path='/cuentas' element={<Vercuentas/>}></Route>
        <Route path='/cuentas/:id' element={<Vercuenta/>}></Route>
        <Route path='/actualizarcuenta/:id' element={<ModificarCuenta/>}></Route>
        <Route path='/miperfil' element={<Perfil/>}></Route>
        <Route path='/modificarperfil' element={<ModificarPerfil/>}></Route>
        <Route path='/vendercuenta' element={<CrearCuenta/>}></Route>
        <Route path='/eloboost' element={<CrearSolicitud/>}></Route>
        <Route path='/boost' element={<VerTodoslosBoosts/>}></Route>
        <Route path='/boost/:id' element={<VerBoost/>}></Route>
        <Route path='/actualizarboost/:id' element={<ActualizarBoost/>}></Route>
      </Routes>
      <Toaster/>
      </div>
      
    </div>

    </>
  );
}

export default App;
