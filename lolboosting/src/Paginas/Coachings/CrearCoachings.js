import React, {useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function CrearCoachings() {
  const navigate = useNavigate()
  const rangos = ["Hierro4","Hierro3","Hierro2","Hierro1","Bronce4","Bronce3","Bronce2","Bronce1","Plata4","Plata3","Plata2","Plata1","Oro4","Oro3","Oro2","Oro1","Platino4",
    "Platino3","Platino2","Platino1","Diamante4","Diamante3","Diamante2","Diamante1","Maestro","GranMaestro","Aspirante","Sinrango"]
  const roles = ["Top","Jungler","Mid","Adc","Support"]
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null || localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }
  },[])
  
  return (
    <div>
      <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link><Link to='/coachings'>/Coachings</Link>/CrearCoach</div>
    <div className='divBox flex items-center justify-center text-white mb-10'>
        <Formik
          initialValues={{
            titulo: '',
            servidor: 'EUW',
            activo: true,
            roles_preferidos: '',
            idioma: '',
            partidas: 1,
            id_cliente: '',
            id_booster: localStorage.getItem("IdUsuario"),
            precio: 0,
            correo_coach: ''
          }}
          validationSchema={Yup.object({
            titulo: Yup.string().required("Es obligatorio poner el rango que tienes").oneOf(rangos,"Tienes que poner uno de los rangos de la lista"),
            roles_preferidos: Yup.string().required("Es obligatorio poner el rol").oneOf(roles,"Tienes que escoger uno de la lista"),
            idioma: Yup.string().required("Es obligatorio poner el idioma").min(5,"Tienes que poner un minimo de 5 caracteres"),
            partidas: Yup.number().required("Es obligatorio poner el numero de partidas"),
            correo_coach: Yup.string().required("Es obligatorio poner tu correo para que te contacten los clientes").email("Tiene que ser un Correo")
          })

          }
          onSubmit={(values) =>{
            let numerorangoinicial
        switch (values.titulo) {
          case "Hierro4":numerorangoinicial=2
            break
            case "Hierro3":numerorangoinicial=2
            break
            case "Hierro2":numerorangoinicial=2
            break;
            case "Hierro1":numerorangoinicial=2
            break;
            case "Bronce4":numerorangoinicial=3
            break;
            case "Bronce3":numerorangoinicial=3
            break;
            case "Bronce2":numerorangoinicial=3
            break;
            case "Bronce1":numerorangoinicial=3
            break;
            case "Plata4":numerorangoinicial=4
            break;
            case "Plata3":numerorangoinicial=4
            break;
            case "Plata2":numerorangoinicial=4
            break;
            case "Plata1":numerorangoinicial=4
            break;
            case "Oro4":numerorangoinicial=5
            break;
            case "Oro3":numerorangoinicial=5
            break;
            case "Oro2":numerorangoinicial=5
            break;
            case "Oro1":numerorangoinicial=5
            break;
            case "Platino4":numerorangoinicial=6
            break;
            case "Platino3":numerorangoinicial=6
            break;
            case "Platino2":numerorangoinicial=6
            break;
            case "Platino1":numerorangoinicial=6
            break;
            case "Diamante4":numerorangoinicial=7
            break;
            case "Diamante3":numerorangoinicial=7
            break;
            case "Diamante2":numerorangoinicial=7
            break;
            case "Diamante1":numerorangoinicial=7
            break;
            case "Maestro":numerorangoinicial=8
            break;
            case "GranMaestro":numerorangoinicial=9
            break;
            case "Aspirante":numerorangoinicial=10
            break;
          default: numerorangoinicial=1
            break;
          }
            let precio = values.precio
            precio += numerorangoinicial*values.partidas
            values.precio=precio
            console.log(values)
            const token=localStorage.getItem("TokenUsuario")
            if(values.partidas>15 || values.partidas<1){
              toast.error("las partidas tienen que estar en el rango comprendido de 1 y 15")
            }else{
              values.precio=0
              values.precio=numerorangoinicial*values.partidas
              let saldoaganar = values.precio-(values.precio/10)
              toast((t) =>(
                <div className='text-xl text-white'>
                    <p>¿Desea vender su servicio a este precio? "Obtendra el dinero en cuanto le compren el servicio" <strong>{saldoaganar}€</strong></p>
                    <br></br>
                    <div>
                        <button className='bg-orange-500 hover:bg-orange-400 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                         axios.post("/coachings",values,{ headers: {"x-access-token" : `${token}`} })
                         .then(res => {console.log(res.status);
                         if(res.status===200){
                          toast.dismiss()
                           toast.success("Subida Correcta",{duration:2500})
                           navigate('/coachings')
                         }else if(res.status===404){
                           toast.error(res.data)
                         }})
                         .catch(error => {
                           console.log(error)
                           if(error.response.data.message==="jwt expired"){
                               toast.error("Sesión Cerrada vuelve a Loggearte")
                               localStorage.clear()
                               navigate("/login")
                           }else if(error.response.status===500){
                             toast.error(error.message.data.message)
                           }else if(error.response.status===404){
                             toast.error("No se ha encontrado")
                           }else{
                             console.log(error)
                             toast.error("Hubo un error")
                           }
                       })
                        }}>¡Subir Coach!</button>
                        <button className='bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2' onClick={()=>{
                          toast.dismiss(t.id)
                          }}>Cancelar</button>
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

             <label>Rango actual</label><br></br>
             <Field component="select" name="titulo" className='text-black'>
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
              <ErrorMessage name='titulo' className='text-red-900' component="p"></ErrorMessage><br/>
              <label>Rol Preferido</label><br></br>
              <Field component="select" name="roles_preferidos" className='text-black'>
              <option defaultValue="Sinvalor">Selecciona un valor</option>
              <option value="Top">Top</option>
              <option value="Jungler">Jungla</option>
              <option value="Mid">Medio</option>
              <option value="Adc">Tirador</option>
              <option value="Support">Soporte</option>
              </Field><br></br>
              <ErrorMessage name='roles_preferidos' className='text-red-900' component="p"></ErrorMessage><br></br>
              <label>Numero de partidas</label><br></br>
              <Field name='partidas' placeholder='1-15' className='text-black'></Field><br></br>
              <ErrorMessage name='partidas' className='text-red-900' component="p"></ErrorMessage><br></br>
              <label>Idioma</label><br></br>
              <Field name="idioma" placeholder="Español, Frances..." className='text-black'></Field><br></br>
              <ErrorMessage name='idioma' className='text-red-900' component="p"></ErrorMessage><br></br>
              <label>Correo de contacto</label><br></br>
              <Field name="correo_coach" placeholder="Correo_contacto@gmail.com" className='text-black'></Field><br></br>
              <ErrorMessage name='correo_coach' className='text-red-900' component="p"></ErrorMessage><br></br>
             <button type='submit' className='mt-10 mb-10 bg-indigo-600 hover:bg-indigo-500 text-3xl'>Subir Coach</button>
         </Form>
          )}
           
        </Formik>
    </div></div>
    
  )
}

export default CrearCoachings