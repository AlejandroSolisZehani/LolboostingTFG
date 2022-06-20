import React, {useEffect}from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
function Registrarse() {
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("IdUsuario")||localStorage.getItem("TokenUsuario")){
      navigate("/")
    }
  }, []); 
  return (
    <div className='divBox flex items-center justify-center text-white'>
      <Formik
      initialValues={{
        email_usuario: '',
        telefono_usuario: '',
        nombre_usuario: '',
        url_imagen: 'https://res.cloudinary.com/dpl89nciq/image/upload/v1655162064/Imagen_Usuarios/a93e8677cdf10a4c28691c3e8719401a_chrojp.jpg',
        contraseña_usuario: '',
        direccion: '',
        roles: ["Usuario"],
        saldo: 0
      }}
      validationSchema={Yup.object({
        email_usuario: Yup.string().required("Es obligatorio poner el correo y que sea único").email("Ha de ser un correo"),
        telefono_usuario: Yup.string().matches(/^[0-9]{9}$/, 'Tiene que ser un numero de 9 digitos').required("Es obligatorio poner el numero de telefono"),
        nombre_usuario: Yup.string().required("Tienes que tener un nombre de Usuario").min(6,"Ha de tener un longitud minima de 6 caracteres"),
        contraseña_usuario: Yup.string().required("Has de poner una contraseña y minimo ha de tener 8 caracteres").min(8),
        direccion: Yup.string().required("Es obligatorio poner una dirección")
      })
    
    }
    onSubmit={(values, actions) =>{
      console.log(values)
      axios.post("/usuarios",values)
      .then(res => {console.log(res);
      if(res.status===200){
      toast.success("Te has resgistrado correctamente",{duration:2500})
      navigate("/login")
      }else{
        toast.error("Algo salio mal")
      }})
      .catch(error => {
        toast.error("El correo electronico o el numero de telefonos ya estan registrados en otra cuenta")
        console.log(error)}
      )
      
    }}
      >
        {({handleSubmit}) =>(
          <Form onSubmit={handleSubmit}>
            <h1 className='px-2 py-2 text-5xl mt-10 mb-10'>Registrarse</h1>
            <div className='mt-10 text-black'>
            <label className='text-white'>Correo Electronico</label><br></br>
            <Field name="email_usuario" placeholder="CorreoDeEjemplo@gmail.com"/><br></br>
            <ErrorMessage name='email_usuario' className='text-red-900' component="p"/>
            </div>
            <div className='mt-10 text-black'>
            <label className='text-white'>Telefono Movil</label><br></br>
            <Field name="telefono_usuario" placeholder="622313017"/><br></br>
            <ErrorMessage name='telefono_usuario' className='text-red-900' component="p"/>
            </div>
            <div className='mt-10 text-black'>
            <label className='text-white'>Nombre Usuario</label><br></br>
            <Field name="nombre_usuario" placeholder="Aszerk"/><br></br>
            <ErrorMessage name='nombre_usuario' className='text-red-900' component="p"/>
            </div>
            <div className='mt-10 text-black'>
            <label className='text-white'>Contraseña Usuario</label><br></br>
            <Field name="contraseña_usuario" type="password"/><br></br>
            <ErrorMessage name='contraseña_usuario' className='text-red-900' component="p"/>
            </div>
            <div className='mt-10 text-black'>
            <label className='text-white'>Direccion</label><br></br>
            <Field name="direccion" placeholder="Calle de la Justicia 8 Fuenlabrada Madrid 28089"/><br></br>
            <ErrorMessage name='direccion' className='text-red-900' component="p"/>
            </div>
            <button type='submit' className='text-3xl bg-blue-500 mt-10'>Registrarse</button>
            <div className='mt-10 mb-10'>
              <p className='mt-5'>¿Ya tienes una cuenta?</p>
              <button onClick={()=>{navigate("/login")}} className='mt-10 bg-indigo-500 text-3xl'>Inicar Sesión</button>
            </div>
          </Form>
      )}
      </Formik>
    </div>
  )
}
export default Registrarse
