import React, {useEffect}from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function CrearBoostMaestria() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
        navigate("/login")
    }
  },[])
  return (
    <div>
       <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/maestrias'>/Maestrias</Link>/SolicitarMaestria</div>
    
    <div className='divBox flex items-center justify-center text-white mb-10'>
        <Formik
          initialValues={{
            titulo: '',
            campeon: '',
            nivel_maestria_actual: '',
            maestria_deseada: '',
            precio: 0,
            nombre_cuenta: '',
            passwd_cuenta: '',
            id_booster: '',
            id_cliente: localStorage.getItem("IdUsuario"),
            activo: true
          }}
          validationSchema={Yup.object({
            campeon: Yup.string().required("Es obligatorio poner al menos un campeon").min(3,"Tiene que tener un minimo de 3 digitos"),
            nivel_maestria_actual:Yup.number("pepe").required("Es obligatorio rellenar este campo"),
            maestria_deseada:Yup.number().required("Es obligatorio rellenar este campo"),
            nombre_cuenta:Yup.string().required("Es obligatorio poner el nombre de la cuenta").min(5,"Tiene que tener un minimo de 5 caracteres"),
            passwd_cuenta:Yup.string().required("Es obligatorio poner el nombre de la cuenta").min(5,"Tiene que tener un minimo de 5 caracteres"),
          })

          }
          onSubmit={(values, actions) =>{

            console.log(values)
            if(values.nivel_maestria_actual > 7 || values.nivel_maestria_actual < 0 || values.maestria_deseada > 7 || values.maestria_deseada < 0 || values.nivel_maestria_actual>=values.maestria_deseada){
              toast.error("Tienes que introduce los valores del nivel de maestria entre 0 y 7 y el nivel de maestria actual no puede ser mas grande o igual que el deseado")
            }else{
              let titulo = "M "+values.nivel_maestria_actual+" -> M "+values.maestria_deseada
              values.titulo=titulo
              values.precio=(values.maestria_deseada-values.nivel_maestria_actual)*5
              toast((t) =>(
                <div className='text-xl text-white'>
                    <p>El servicio cuesta  <strong>{values.precio}€</strong></p>
                    <br></br>
                    <div>
                        <button className='bg-orange-500 hover:bg-orange-400 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                          axios.post("/maestrias",values,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                          .then(res => {
                            console.log(res)
                            if(res.status===200){
                              toast.dismiss()
                              toast.success("Solicitud Realizada con Exito")
                              navigate("/maestrias")
                            }
                          })
                          .catch(error => {
                            console.log(error)
                            if(error.response.data.message==="jwt expired"){
                                toast.error("Sesión Cerrada vuelve a Loggearte")
                                localStorage.clear()
                                navigate("/login")
                            }else if(error.response.status===500){
                              toast.error("ha habido un error en el Servidor")
                            }else if(error.response.status===404){
                              toast.error(error.response.data)
                            }else{
                              console.log(error)
                              toast.error("Hubo un error")
                            }
                        })
                        }}>Comprar</button>
                        <button className='bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2' onClick={()=>{toast.dismiss(t.id)}}>Cancelar</button>
                    </div>
                </div>
            ),{
                style: {
                    background: "#202020"
                }
            })
              
            }
            

          }}
        >
          {({handleSubmit}) =>(
             <Form onSubmit={handleSubmit}>
              <label>Nivel de Maestria Actual</label><br/>
             <Field name="nivel_maestria_actual" placeholder="0 - 7" className='text-black'/><br/>
             <ErrorMessage name='nivel_maestria_actual' className='text-red-900' component="p"></ErrorMessage>
             <br/>
             <label>Nivel de Maestria Deseada</label><br/>
             <Field name="maestria_deseada" placeholder="0 - 7" className='text-black'/><br/>
             <ErrorMessage name='maestria_deseada' className='text-red-900' component="p"></ErrorMessage>
             <br/>
             <label>Nombre de invocador</label><br/>
             <Field name="nombre_cuenta" placeholder="aspectos" className='text-black'/><br/>
             <ErrorMessage name='nombre_cuenta' className='text-red-900' component="p"></ErrorMessage><br></br>
             <label>Contraseña de la cuenta</label><br/>
             <Field name="passwd_cuenta" placeholder="aspectos" type="password" className='text-black'/><br/>
             <ErrorMessage name='passwd_cuenta' className='text-red-900' component="p"></ErrorMessage><br></br>
             <label>Nombre del Campeon</label><br/>
             <Field name="campeon" placeholder="Zoe" className='text-black'/><br/>
             <ErrorMessage name='campeon' className='text-red-900' component="p"></ErrorMessage><br></br>
             <button type='submit' className='bg-indigo-600 hover:bg-indigo-500 text-3xl mt-10 mb-10'>Pagar Servicio</button>
         </Form>
          )}
           
        </Formik>
    </div></div>
    
  )
}

export default CrearBoostMaestria