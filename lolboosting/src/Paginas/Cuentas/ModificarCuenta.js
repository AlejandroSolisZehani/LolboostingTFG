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
    useEffect(()=>{
      if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
        navigate("/login")
      }else{
        axios.get("/cuentas",{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(res => console.log(res))
        .catch(error => {
            console.log(error)
            if(error.response.data.message==="jwt expired"){
                toast.error("Sesión Cerrada vuelve a Loggearte")
                localStorage.clear()
                navigate("/login")
            }
        })
    }
    },[])
      const token=localStorage.getItem("TokenUsuario")
    const rangos = ["Hierro4","Hierro3","Hierro2","Hierro1","Bronce4","Bronce3","Bronce2","Bronce1","Plata4","Plata3","Plata2","Plata1","Oro4","Oro3","Oro2","Oro1","Platino4",
    "Platino3","Platino2","Platino1","Diamante4","Diamante3","Diamante2","Diamante1","Maestro","GranMaestro","Aspirante","Sinrango"]
    const params = useParams()
    useEffect(()=>{
        axios.get(`/cuentas/${params.id}`,{ headers: {"x-access-token" : `${token}`} })
        .then(response => setCuenta(response.data))
        .catch(error => console.log(error))
    },[])
    if(cuenta.length===0){
        return <div className='Cuenta bg-red'>
        No se ha encontrado la cuenta
    </div>
        
    }else{
      return <div className='Cuenta'>
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
        axios.put(`/cuentas/${params.id}`,values,{ headers: {"x-access-token" : `${token}`} })
        .then(res => {console.log(res.status);
        if(res.status===200){
          toast.success("Subida de cuenta Correcta",{duration:2500})
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
          }else{
            toast.error(error.response.data)
          }
      })
      }}
      enableReinitialize
      >
        {({handleSubmit}) =>(
             <Form onSubmit={handleSubmit}>
             <Field name="titulo" placeholder="Titulo"/>
             <ErrorMessage name='titulo' className='text-red-900' component="p"></ErrorMessage>
             <br/>
             <Field name="servidor" placeholder="Servidor"/>
             <ErrorMessage name='servidor'></ErrorMessage>
             <br/>
             <Field name="campeones" placeholder="campeones"/>
             <ErrorMessage name='campeones'></ErrorMessage>
             <br/>
             <Field name="aspectos" placeholder="aspectos"/><br/>
             <ErrorMessage name='aspectos'></ErrorMessage><br></br>
             <Field component="select" name="rango_temporada_pasada" placeholder="rango_temporada_pasada">
               <option defaultValue="Seleccioneunaopcion">Seleciona una opcion</option>
               <option value="Sinrango">Sin rango</option>
               <optgroup label='Hierro'>
                <option value="Hierro4">Hierro 4</option> 
                <option value="Hierro3">Hierro 3</option> 
                <option value="Hierro2">Hierro 2</option> 
                <option value="Hierro1">Hierro 1</option> 
              </optgroup>
              <optgroup label='Bronce'>
                <option value="Bronce4">Bronce 4</option> 
                <option value="Bronce3">Bronce 3</option> 
                <option value="Bronce2">Bronce 2</option> 
                <option value="Bronce1">Bronce 1</option> 
              </optgroup>
              <optgroup label='Plata'>
                <option value="Plata4">Plata 4</option> 
                <option value="Plata3">Plata 3</option> 
                <option value="Plata2">Plata 2</option> 
                <option value="Plata1">Plata 1</option> 
              </optgroup>
              <optgroup label='Oro'>
                <option value="Oro4">Oro 4</option> 
                <option value="Oro3">Oro 3</option> 
                <option value="Oro2">Oro 2</option> 
                <option value="Oro1">Oro 1</option> 
              </optgroup>
              <optgroup label='Platino'>
                <option value="Platino4">Platino 4</option> 
                <option value="Platino3">Platino 3</option> 
                <option value="Platino2">Platino 2</option> 
                <option value="Platino1">Platino 1</option> 
              </optgroup>
              <optgroup label='Diamante'>
                <option value="Diamante4">Diamante 4</option> 
                <option value="Diamante3">Diamante 3</option> 
                <option value="Diamante2">Diamante 2</option> 
                <option value="Diamante1">Diamante 1</option> 
              </optgroup>
              <optgroup label='Maestro'>
              <option value="Maestro">Maestro</option>
              </optgroup>
              <optgroup label='Gran Maestro'>
              <option value="GranMaestro">Gran Maestro</option>
              </optgroup>
              <optgroup label='Aspirante'>
              <option value="Aspirante">Aspirante</option>
              </optgroup>
              </Field><br/>
              <ErrorMessage name='rango_temporada_pasada'></ErrorMessage><br/>
              <label> Email verificado</label>
             <Field name="email_verificado" placeholder="email_verificado" component="select">
               <option value="True">True</option>
               <option value="Flase">False</option>
              </Field>
              <br/>
             <Field name="nivel_cuenta" placeholder="nivel_cuenta"/><br/>
             <Field name="rango_temporada_actual" placeholder="rango_temporada_actual"/><br/>
             <Field name="riot_points" placeholder="riot_points"/><br/>
             <Field name="esencia_azul" placeholder="esencia_azul"/><br/>
             <Field name="correo_cuenta" placeholder="correo_cuenta"/><br/>
             <Field name="contraseña_cuenta" placeholder="contraseña_cuenta"/><br/>
             <Field name="nombre_invocador" placeholder="nombre_invocador"/><br/>
             <Field name="id_vendedor" placeholder="id_vendedor"/><br/>
             <Field name="id_comprador" placeholder="id_comprador"/><br/>
             <Field name="precio" placeholder="precio"/><br/>
             <Field name="activo" placeholder="activo"/><br/>
             <button type='submit'>Subir Cuenta</button>
         </Form>
          )}
      </Formik>
  </div>
    }
}

export default ModificarCuenta