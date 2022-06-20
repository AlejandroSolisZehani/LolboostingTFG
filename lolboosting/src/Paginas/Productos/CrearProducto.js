import React, {useEffect, useState} from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

function CrearProducto() {
  const navigate = useNavigate()
  const [Producto, setProducto] = useState([])
  const [Usuario, setUsuario] = useState([])
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null || localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }else{
      axios.get(`/usuarios/${localStorage.getItem("IdUsuario")}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
      .then(res =>{
        if(res.status===200){
          setUsuario(res.data)
        }
      })
      .catch(error =>{
        console.log(error)
        if(error.response.status===500){
          toast.error("Hubo un error y no se ha encontrado al usuario")
          navigate("/")
        }
      })
      
    }
  },[])
  useEffect(()=>{
    

    console.log(Usuario)
  },[])
  if(Usuario.roles=='Usuario'){
    toast.error("no eres admin")
    navigate("/")
  }
    return (
      <div>
        <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/productos'>Productos</Link></div>
      
      <div className='divBox flex items-center justify-center text-white mb-10'>
        <Formik
        initialValues={{
          titulo: '',
          precio: 1,
          detalles: '',
          imagenes: '',
          activo: true
        }}
        validationSchema={Yup.object({
          titulo: Yup.string().required("El titulo es obligatorio para subir el producto").min(5,"Tiene que tener como minimo 5 caracteres"),
          precio: Yup.number().required("Es obligatorio ponerle un precio a los productos que vamos a vender"),
          detalles: Yup.string().required("Es obligatorio poner una descripción").min(5,"Minimo 5 caracteres").max(300,"Maximo 300 caracteres"),
          imagenes: Yup.string().required("Es obligatorio poner la url de la imagen").min(20,"Tiene que tener como minimo 20 caracteres"),
        })
      }
      onSubmit={(values) =>{
        console.log(values)
        if(values.precio===0 || values.precio<=0){
          toast.error("No podemos vender un producto y que sea gratis o que tenga un valor negativo")
        }else{
          axios.post("/productos",values,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(res =>{
          console.log(res)
          if(res.status===200){
            toast.success("Se ha subido el producto correctamente")
            navigate("/productos")
          }
        })
        .catch(error => {
          console.log(error)
          if(error.response.data.message==="jwt expired"){
              toast.error("Sesión Cerrada vuelve a Loggearte")
              localStorage.clear()
              navigate("/login")
          }else if(error.response.status===500){
            toast.error(error.message.data.message)
          }else if(error.response.status===404){
            toast.error(error.response.data)
          }else{
            console.log(error)
            toast.error("Hubo un error")
          }
      })
        }
        
      }}
        >
          {({handleSubmit}) =>(
             <Form onSubmit={handleSubmit}>
              <label>Titulo</label><br></br>
              <Field name='titulo' placeholder='Taza / Figura ...' className='text-black'></Field><br></br>
              <ErrorMessage name='titulo' className='text-red-900' component="p"></ErrorMessage><br></br>
              <label>Precio</label><br></br>
              <Field name='precio' placeholder='20,35' className='text-black'></Field><br></br>
              <ErrorMessage name='precio' className='text-red-900' component="p"></ErrorMessage><br></br>
              <label>detalles</label><br></br>
              <Field name='detalles' placeholder='Taza de 10cm alto x 5cm ancho' className='text-black'></Field><br></br>
              <ErrorMessage name='detalles' className='text-red-900' component="p"></ErrorMessage><br></br>
              <label>Url imagen</label><br></br>
              <Field name='imagenes' placeholder='http://imagenes/tazalol.png' className='text-black'></Field><br></br>
              <ErrorMessage name='imagenes' className='text-red-900' component="p"></ErrorMessage><br></br>

             <button type='submit' className='mt-10 mb-10 bg-indigo-600 hover:bg-indigo-500 text-3xl'>Subir Producto</button>
         </Form>
          )}
           
        </Formik>
      </div></div>
    )
  
  
  
}

export default CrearProducto