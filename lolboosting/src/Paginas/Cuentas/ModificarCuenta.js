import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { Formik,Form, Field, ErrorMessage, enableReinitialize } from 'formik'
function ModificarCuenta() {
    const [cuenta, setCuenta] = useState([])
    const navigate = useNavigate();
      const token=localStorage.getItem("TokenUsuario")
    const rangos = ["Hierro4","Hierro3","Hierro2","Hierro1","Bronce4","Bronce3","Bronce2","Bronce1","Plata4","Plata3","Plata2","Plata1","Oro4","Oro3","Oro2","Oro1","Platino4",
    "Platino3","Platino2","Platino1","Diamante4","Diamante3","Diamante2","Diamante1","Maestro","GranMaestro","Aspirante","Sinrango"]
    const params = useParams()
    useEffect(()=>{
        if(localStorage.getItem("IdUsuario")==null|| localStorage.getItem("TokenUsuario")==null){
          navigate("/login")
        }else{
          axios.get(`/cuentas/${params.id}`,{ headers: {"x-access-token" : `${token}`} })
        .then(response => {
          setCuenta(response.data)
        if(response.data.id_vendedor!==localStorage.getItem("IdUsuario")){
          toast.error("No tienes derecho a modificar la cuenta")
          navigate("/cuentas")
        }
        })
        .catch(error => console.log(error))
        }
        
    },[])
    if(cuenta.length===0){
        return <div className='Cuenta bg-red'>
        No se ha encontrado la cuenta
    </div>
        
    }else{
      return <div className='divBox flex items-center justify-center text-white mb-10'>
      <Formik
      initialValues={cuenta}
      validationSchema={Yup.object({
        titulo: Yup.string().required("El titulo es obligatorio ponerlo"),
            servidor: Yup.string().required("El Servidor es obligatorio ponerlo"),
            campeones: Yup.number().required("Es obligatorio poner el numero de campeones que tiene la cuenta"),
            aspectos: Yup.number().required("Es obligatorio poner el numero de aspectos que tiene la cuenta"),
            rango_temporada_pasada: Yup.string().oneOf(rangos).required("El Rango de la temporada pasada es obligatorio ponerlo"),
            email_verificado: Yup.boolean().required("Es obligatorio poner un valor")
      })

      }
      onSubmit={(values, actions) =>{
        console.log(values)
        if(values.id_vendedor===localStorage.getItem("IdUsuario")){
          axios.put(`/cuentas/${params.id}`,values,{ headers: {"x-access-token" : `${token}`} })
        .then(res => {console.log(res.status);
        if(res.status===200){
          toast.success("Antualizacion de cuenta Correcta",{duration:2500})
          navigate('/cuentas')
        }else{
          toast.error("Algo salio mal")
        }})
        .catch(error => {
          console.log(error)
          if(error.response.data.message==="jwt expired"){
              toast.error("Sesión Cerrada vuelve a Loggearte")
              localStorage.clear()
              navigate("/login")
          }else if(error.response.status===500){
            toast.error("El Nombre de invocador o el correo ya se han usado en otra cuenta")
          }else{
            toast.error(error.response.data.message)
          }
      })
        }else{
          toast.error("No tienes derecho a modificar la cuenta")
          navigate("/cuentas")
        }
        
        
      }}
      enableReinitialize
      >
        {({handleSubmit}) =>(
             <Form onSubmit={handleSubmit}>
              <label> Email verificado</label>
             <Field name="email_verificado" placeholder="email_verificado" component="select" className='text-black'>
               <option value="true">True</option>
               <option value="false">False</option>
              </Field>
              <br/>
              <br></br>
              <label>Correo de la cuenta</label><br></br>
             <Field name="correo_cuenta" placeholder="correo_cuenta" className='text-black'/><br/>
             <ErrorMessage name="correo_cuenta"  className='text-red-900' component="p"></ErrorMessage><br></br>
             <label>Contraseña Cuenta</label><br></br>
             <Field name="contraseña_cuenta" type="password" className='text-black'/><br/>
             <ErrorMessage name='contraseña_cuenta'  className='text-red-900' component="p"></ErrorMessage><br></br>
             <label>Nombre de invocador</label><br></br>
             <Field name="nombre_invocador" placeholder="nombre_invocador" className='text-black'/><br/>
             <ErrorMessage name='nombre_invocador'  className='text-red-900' component="p"></ErrorMessage>
             <button type='submit' className='mt-10 mb-10 bg-indigo-600 hover:bg-indigo-500 text-3xl'>Editar Cuenta</button>
         </Form>
          )}
      </Formik>
  </div>
    }
}

export default ModificarCuenta