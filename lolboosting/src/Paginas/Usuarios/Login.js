import React, {useEffect} from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
export default function Login() {
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("IdUsuario")||localStorage.getItem("TokenUsuario")){
      navigate("/")
    }
  }, []); 

  return (
    <div className='divBox flex items-center justify-center'>
      <Formik
      initialValues={{
        email_usuario: '',
        contraseña_usuario: ''
      }}
      validationSchema={Yup.object({
        email_usuario: Yup.string().required("Es obligatorio poner el correo para iniciar sesion").email("Ha de ser un correo"),
        contraseña_usuario: Yup.string().required("Has de poner una contraseña para iniciar sesion")
      })
    }
    onSubmit={(values, actions) =>{
      console.log(values)
      axios.post("/login",values)
      .then(res => {
        if(res.status===200){
          toast.success("Has iniciado sesion correctamente",{duration:2500})
          localStorage.setItem("TokenUsuario",res.data.token)
          localStorage.setItem("IdUsuario",res.data.id.id)
          localStorage.removeItem("Carrito")
          navigate("/miperfil")
        }
        
      })
      .catch(error=> {
        if(error.response.status===401){
          toast.error(error.response.data.message)
        }else if(error.response.status===404){
          toast.error(error.response.data.message)
        }else{
          toast.error(error)
        }
      })
    }}
      >
        {({handleSubmit}) =>(
          <Form onSubmit={handleSubmit}>
            <div className='text-white'>
              <h1 className='px-2 py-2 text-6xl mt-10 mb-10'>Login</h1>
            <div>
            <label className='mt-10'>Correo Electronico</label><br></br>
            <Field name="email_usuario" placeholder="CorreoDeEjemplo@gmail.com" className='text-black'/><br></br>
            <ErrorMessage name='email_usuario' className='text-red-900' component="p"/>
            </div>
           
            <div className='mt-10 text-black'>
            <label>Contraseña Usuario</label><br></br>
            <Field name="contraseña_usuario" type="password"/><br></br>
            <ErrorMessage name='contraseña_usuario' className='text-red-900' component="p"/>
            </div>
            <div className='mt-10'>
            <button type='submit' className='text-3xl bg-blue-500'>Iniciar sesion</button>
            </div>
            <div className='mt-10 mb-10'>
              <p className='mt-5'>¿No tienes una cuenta?</p>
              <button onClick={()=>{navigate("/signup")}} className='mt-10 bg-indigo-500 text-3xl'>Registrate</button>
              </div>
            </div>
          </Form>
      )}
      </Formik>
    </div>
  )
}
