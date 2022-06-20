import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { Formik,Form, Field, ErrorMessage, enableReinitialize } from 'formik'

function ActualizarMaestria() {
    const navigate = useNavigate()
    const [Maestria, setMaestria] = useState([])
    const params = useParams()
    useEffect(()=>{
        if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
            navigate("/login")
          }else{
            axios.get(`/maestrias/${params.id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
            .then(res => {
                console.log(res)
                setMaestria(res.data)
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
    if(Maestria.activo===false){
        return <div>No se ha encontrado la Maestria</div>
    }
    return <div>
        <Formik
        initialValues={Maestria}
        validationSchema={Yup.object({
            nombre_cuenta: Yup.string().required("Es obligatorio poner el nombre de la cuenta").min(5,"Tiene que tener como minimo 5 caracteres"),
            passwd_cuenta: Yup.string().required("Es obligatorio poner la contraseña de la cuenta").min(5,"Tiene que tener como minimo 5 caracteres ")
        }) 
    }
    onSubmit={(values, actions) =>{
        console.log(values)
        if(localStorage.getItem("IdUsuario")!==Maestria.id_cliente){
            toast.error("No puedes editar esto")
            navigate("/maestrias")
        }else{
        axios.put(`/maestrias/${params.id}`,values,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(res => {
            console.log(res)
            if(res.status===200){
                toast.success("Se ha actualizado correctamente")
                navigate("/maestrias")
            }
        })
        .catch(error => {
            console.log(error)
            if(error.response.data.message==="jwt expired"){
              toast.error("Sesión Cerrada vuelve a Loggearte")
              localStorage.clear()
              navigate("/login")
          }else{
            toast.error(error.response.data.message)
          }
          })
        }
    }
    }
    enableReinitialize
        >
          {({handleSubmit}) =>(   
            <Form onSubmit={handleSubmit}>
                <label>Nombre de Invocador</label><br></br>
                <Field name='nombre_cuenta'></Field><br></br>
                <ErrorMessage name='nombre_cuenta'></ErrorMessage><br></br>
                <label>Contraseña de la Cuenta</label><br></br>
                <Field name='passwd_cuenta' type='password'></Field><br></br>
                <ErrorMessage name='passwd_cuenta'></ErrorMessage>
                <button type='submit'>Actualizar Datos de Maestria</button>
            </Form>
        )}
        </Formik>
    </div>
}

export default ActualizarMaestria