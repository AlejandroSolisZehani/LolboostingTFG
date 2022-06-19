import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { Formik,Form, Field, ErrorMessage, enableReinitialize } from 'formik'

export default function EditarCoach() {
  const roles = ["Top","Jungler","Mid","Adc","Support"]
  const navigate = useNavigate()
  const [Coach, setCoach] = useState([])
  const params = useParams()
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null || localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }else{
      axios.get(`/coachings/${params.id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
      .then(res =>{
        console.log(res)
        if(res.status===200){
          setCoach(res.data)
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
          navigate("/coachings")
        }else{
          toast.error("Hubo un error y no se ha encontrado ninguna publicacion con este id")
          navigate("/coachings")
        }
    })
    }
    
  },[])
  return (
    <div>
      <Formik
      initialValues={Coach}
      validationSchema={Yup.object({
        idioma: Yup.string().required("Es obligatorio poner el nombre de la cuenta").min(5,"Tiene que tener como minimo 5 caracteres"),
        correo_coach: Yup.string().required("Es obligatorio poner el correo de contacto de la cuenta").email("Tiene que ser un correo"),
        roles_preferidos: Yup.string().required("Es obligatorio poner el rol").oneOf(roles,"Tienes que escoger uno de la lista")
    }) 
  }
  onSubmit={(values) =>{
    console.log(values)
    if(Coach.id_booster!==localStorage.getItem("IdUsuario")){
      toast.error("No tienes derecho a modificar esta publicacion")
      navigate("/coachings")
    }else{
      axios.put(`/coachings/${params.id}`,values,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
      .then(res =>{
        console.log(res)
        if(res.status===200){
          toast.success("Se ha actualizado correctamente")
          navigate("/coachings")
        }else{
          toast.error("Hubo un error a la hora de actualizar")
          navigate("/coachings")
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
          navigate("/coachings")
        }else{
          toast.error("Hubo un error y no se ha encontrado ninguna publicacion con este id")
          navigate("/coachings")
        }
    })
    }
    
  }}
  enableReinitialize
      >
       {({handleSubmit}) =>(
             <Form onSubmit={handleSubmit}>

              <label>Rol Preferido</label><br></br>
              <Field component="select" name="roles_preferidos">
              <option defaultValue="Sinvalor">Selecciona un valor</option>
              <option value="Top">Top</option>
              <option value="Jungler">Jungla</option>
              <option value="Mid">Medio</option>
              <option value="Adc">Tirador</option>
              <option value="Support">Soporte</option>
              </Field><br></br>
              <ErrorMessage name='roles_preferidos'></ErrorMessage><br></br>
              
              <label>Idioma</label><br></br>
              <Field name="idioma" placeholder="Español, Frances..."></Field><br></br>
              <ErrorMessage name='idioma'></ErrorMessage><br></br>
              <label>Correo de contacto</label><br></br>
              <Field name="correo_coach" placeholder="Correo_contacto@gmail.com"></Field><br></br>
              <ErrorMessage name='correo_coach'></ErrorMessage><br></br>
             <button type='submit'>Actualizar Coach</button>
         </Form>
          )}
           
        </Formik>
    </div>
  )
}
