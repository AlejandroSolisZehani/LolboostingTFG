import React, {useEffect, useState} from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
export default function EditarProducto() {
  const params = useParams()
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
      axios.get(`/productos/${params.id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
      .then(res=>{
        console.log(res)
        if(res.status===200){
          setProducto(res.data)
        }
      })
      .catch(error => {
        console.log(error)
        if(error.response.data.message==="jwt expired"){
            toast.error("Sesión Cerrada vuelve a Loggearte")
            localStorage.clear()
            navigate("/login")
        }else if(error.response.status===404){
          toast.error("No se ha encontrado")
          navigate("/productos")
        }else{
          toast.error("Hubo un error y no se ha encontrado ninguna publicacion con este id")
          navigate("/productos")
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
        <Formik
        initialValues={Producto}
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
          axios.put(`/productos/${values._id}`,values,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(res =>{
          console.log(res)
          if(res.status===200){
            toast.success("Se ha actualizado el producto correctamente")
            navigate("/productos")
          }
        })
        .catch(error => {
          console.log(error)
          if(error.response.data.message==="jwt expired"){
              toast.error("Sesión Cerrada vuelve a Loggearte")
              localStorage.clear()
              navigate("/login")
          }else if(error.response.status===404){
            toast.error("No se ha encontrado")
            navigate("/productos")
          }else{
            toast.error("Hubo un error y no se ha encontrado ninguna publicacion con este id")
            navigate("/productos")
          }
      })
        }
        
      }}
      enableReinitialize
        >
          {({handleSubmit}) =>(
             <Form onSubmit={handleSubmit}>
              <label>Titulo</label><br></br>
              <Field name='titulo' placeholder='Taza / Figura ...'></Field><br></br>
              <ErrorMessage name='titulo'></ErrorMessage><br></br>
              <label>Precio</label><br></br>
              <Field name='precio' placeholder='20,35'></Field><br></br>
              <ErrorMessage name='precio'></ErrorMessage><br></br>
              <label>detalles</label><br></br>
              <Field name='detalles' placeholder='Taza de 10cm alto x 5cm ancho'></Field><br></br>
              <ErrorMessage name='detalles'></ErrorMessage><br></br>
              <label>Url imagen</label><br></br>
              <Field name='imagenes' placeholder='http://imagenes/tazalol.png'></Field><br></br>
              <ErrorMessage name='imagenes'></ErrorMessage><br></br>
             <button type='submit'>Subir Cuenta</button>
         </Form>
          )}
           
        </Formik>
      </div>
    )
  
}
