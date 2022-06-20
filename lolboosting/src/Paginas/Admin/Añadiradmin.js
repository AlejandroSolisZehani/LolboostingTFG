import React, {useEffect, useState}from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
export default function Añadiradmin() {
  const navigate = useNavigate()
  const [Usuario, setUsuario] = useState([])
  useEffect(() => {
    if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
      navigate("/")
    }
    axios.get(`/usuarios/${localStorage.getItem("IdUsuario")}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(res =>{
            console.log(res)
            if(res.status===200){
                console.log(res)
                setUsuario(res.data)
                console.log("Hola")
                if(res.data.roles!='Admin'){
                    toast.error("No tienes permisos")
                    navigate('/miperfil')
                }
            }
        })
        .catch(error =>{
            console.log(error)
            if(error.response.status===404){
                toast.error("No se ha encontrado el usuario")
                navigate("/login")
            }else if(error.response.status===500){
                toast.error("Hubo un error en el servidor")
                navigate("/login")
            }else if(error.response.data.message==="jwt expired"){
                toast.error("Sesión Cerrada vuelve a Loggearte")
                localStorage.clear()
                navigate("/login")
            }
        })
       
  }, []); 
  return (
    <div>
      <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link><Link to='/admin'>/Admin</Link>/AñadirAdmin</div>
    <div className='divBox flex items-center justify-center text-white mb-10'>
      <Formik
      initialValues={{
        email_usuario: '',
        telefono_usuario: '',
        nombre_usuario: '',
        url_imagen: 'https://res.cloudinary.com/dpl89nciq/image/upload/v1655162064/Imagen_Usuarios/a93e8677cdf10a4c28691c3e8719401a_chrojp.jpg',
        contraseña_usuario: '',
        direccion: '',
        roles: ["Admin"],
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
      toast.success("Hemos registrado al admin correctamente",{duration:2500})
      navigate("/admin")
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
            <div>
            <div>
            <label>Correo Electronico</label><br></br>
            <Field name="email_usuario" placeholder="CorreoDeEjemplo@gmail.com" className='text-black'/><br></br>
            <ErrorMessage name='email_usuario' className='text-red-900' component="p"/>
            </div>
            <div>
            <label>Telefono Movil</label><br></br>
            <Field name="telefono_usuario" placeholder="622313017" className='text-black'/><br></br>
            <ErrorMessage name='telefono_usuario' className='text-red-900' component="p"/>
            </div>
            <div>
            <label>Nombre Usuario</label><br></br>
            <Field name="nombre_usuario" placeholder="Aszerk" className='text-black'/><br></br>
            <ErrorMessage name='nombre_usuario' className='text-red-900' component="p"/>
            </div>
            <div>
            <label>Contraseña Usuario</label><br></br>
            <Field name="contraseña_usuario" type="password" className='text-black'/><br></br>
            <ErrorMessage name='contraseña_usuario' className='text-red-900' component="p"/>
            </div>
            <div>
            <label>Direccion</label><br></br>
            <Field name="direccion" placeholder="Calle de la Justicia 8 Fuenlabrada Madrid 28089" className='text-black'/><br></br>
            <ErrorMessage name='direccion' className='text-red-900' component="p"/>
            </div>
            <button type='submit' className='mt-10 mb-10 bg-indigo-600 hover:bg-indigo-500 text-3xl'>Registrar Admin</button>
            </div>
          </Form>
      )}
      </Formik>
    </div></div>
  )
}
