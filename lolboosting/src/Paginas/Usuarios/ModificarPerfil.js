import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Formik,Form, Field, ErrorMessage, enableReinitialize } from 'formik'
function ModificarPerfil() {
    const [usuario, setUsuario] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
            navigate("/login")
          }else{
        axios.get(`/usuarios/${localStorage.getItem("IdUsuario")}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(response => setUsuario(response.data))
        .catch(error => console.log(error))
    }},[])
  return (
    <>
    <div>
        <Formik
        initialValues={usuario}
          validationSchema={Yup.object({
            email_usuario: Yup.string().required("Es obligatorio poner el correo y que sea único").email("Ha de ser un correo"),
            telefono_usuario: Yup.string().matches(/^[0-9]{9}$/, 'Tiene que ser un numero de 9 digitos').required("Es obligatorio poner el numero de telefono"),
            nombre_usuario: Yup.string().required("Tienes que tener un nombre de Usuario").min(6,"Ha de tener un longitud minima de 6 caracteres"),
            direccion: Yup.string().required("Es obligatorio poner una dirección")
          })
        
        }
        onSubmit={(values, actions) =>{
            console.log(values)
            axios.put(`/usuarios/${localStorage.getItem("IdUsuario")}`,values,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
            .then(res => {console.log(res.status);
            if(res.status===200){
              toast.success("Se ha actualizado sin problemas",{duration:2500})
              navigate('/miperfil')
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
                toast.error("El telefono o Correo electronico ya estan en uso")
            }
            })
          }}
          enableReinitialize
        >
            {({handleSubmit}) =>(
          <Form onSubmit={handleSubmit}>
            <div>
            <div>
            <label>Correo Electronico</label>
            <Field name="email_usuario" placeholder="CorreoDeEjemplo@gmail.com"/><br></br>
            <ErrorMessage name='email_usuario' className='text-red-900' component="p"/>
            </div>
            <div>
            <label>Telefono Movil</label>
            <Field name="telefono_usuario" placeholder="622313017"/><br></br>
            <ErrorMessage name='telefono_usuario' className='text-red-900' component="p"/>
            </div>
            <div>
            <label>Nombre Usuario</label>
            <Field name="nombre_usuario" placeholder="Aszerk"/><br></br>
            <ErrorMessage name='nombre_usuario' className='text-red-900' component="p"/>
            </div>
            <div>
            <label>Direccion</label>
            <Field name="direccion" placeholder="Calle de la Justicia 8 Fuenlabrada Madrid 28089"/><br></br>
            <ErrorMessage name='direccion' className='text-red-900' component="p"/>
            </div>
            <button type='submit'>Actualizar</button>
            </div>
          </Form>
      )}
        </Formik>
    </div>
    </>
  )
}

export default ModificarPerfil