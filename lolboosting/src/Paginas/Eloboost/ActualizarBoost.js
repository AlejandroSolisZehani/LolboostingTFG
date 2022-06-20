import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { Formik,Form, Field, ErrorMessage, enableReinitialize } from 'formik'

function ActualizarBoost() {
    const roles = ["Top","Jungler","Mid","Adc","Support"]
    const [Boost, setBoost] = useState([])
    const params = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
      if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
        navigate("/login")
      }else{
        axios.get(`/eloboosts/${params.id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(res => {
            console.log(res)
            setBoost(res.data)
        })
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
    if(Boost.length===0){
        return <div>No se ha encontrado la peticion de Boost</div>
    }else{
        return <div>
                <Formik
                initialValues={Boost}
                validationSchema={Yup.object({
                  rol_preferido: Yup.string().required("Es obligatorio poner el rol preferido").oneOf(roles,"Escoge un rol"),
                  nombre_cuenta: Yup.string().required("Es obligatorio poner el nombre de usuario de la cuenta").min(5,"Es obligatorio que tenga una longitud minima de 5"),
                  passwd_cuenta: Yup.string().required("Es obligatorio poner el nombre de usuario de la cuenta").min(5,"Es obligatorio que tenga una longitud minima de 5"),
                  campeon_preferido: Yup.string().required("Es obligatorio poner un campeon preferido").min(3,"Tiene que tener minimo una longitud de 3")
        
                })
              }
              onSubmit={(values, actions) =>{
                console.log(values)
                axios.put(`/eloboosts/${params.id}`,values,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                .then(res => {console.log(res.status);
                if(res.status===200){
                    toast.success("Subida de cuenta Correcta",{duration:2500})
                    navigate('/boost')
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
                      
                      <label>Rol Preferido</label><br></br>
                     <Field component="select" name="rol_preferido" >
                       <option defaultValue="Seleccioneunaopcion">Seleciona una opcion</option>
                        <option value="Top">Toplane</option>
                        <option value="Jungler">Jungla</option>
                        <option value="Mid">Medio</option>
                        <option value="Adc">Tirador</option>
                        <option value="Support">Soporte</option>
                     
                      </Field><br/>
                      <ErrorMessage name='rol_preferido' className='text-red-900' component="p"></ErrorMessage><br/>
                      <label>Nombre de la cuenta</label><br/>
                      <Field name="nombre_cuenta"></Field><br/>
                      <ErrorMessage name='nombre_cuenta' className='text-red-900' component="p"></ErrorMessage><br/>
                      <label>Contraseña de la cuenta</label><br/>
                      <Field name="passwd_cuenta"></Field><br/>
                      <ErrorMessage name='passwd_cuenta' className='text-red-900' component="p"></ErrorMessage><br/>
                      <label>Campeon / Campeones Preferidos</label><br/>
                      <Field name="campeon_preferido"></Field><br/>
                      <ErrorMessage name='campeon_preferido' className='text-red-900' component="p"></ErrorMessage><br/>
                     <button type='submit'>Actualizar Cuenta</button>
                 </Form>
                  )}
                </Formik>
            </div>
          
    }
}

export default ActualizarBoost