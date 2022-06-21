import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
function CrearCuenta() {
    const navigate = useNavigate();
    useEffect(()=>{
      if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
        navigate("/login")
      }
    },[])
    const rangos = ["Hierro4","Hierro3","Hierro2","Hierro1","Bronce4","Bronce3","Bronce2","Bronce1","Plata4","Plata3","Plata2","Plata1","Oro4","Oro3","Oro2","Oro1","Platino4",
    "Platino3","Platino2","Platino1","Diamante4","Diamante3","Diamante2","Diamante1","Maestro","GranMaestro","Aspirante","Sinrango"]
  return (
    <div><div className='text-2xl text-white'><Link to='/'>Lolboosting</Link><Link to='/cuentas'>/Cuentas</Link>/CrearCuenta</div>
    <div className='divBox flex items-center justify-center text-white mb-10'>
        <Formik
          initialValues={{
            titulo: '',
            servidor: 'EUW',
            campeones: '',
            aspectos: '',
            rango_temporada_pasada: '',
            email_verificado: false,
            nivel_cuenta: '',
            rango_temporada_actual: 'Sinrango',
            riot_points: '',
            esencia_azul: '',
            correo_cuenta: '',
            contraseña_cuenta: '',
            nombre_invocador: '',
            id_vendedor: localStorage.getItem("IdUsuario"),
            id_comprador: '',
            precio: 0,
            activo: true
          }}
          validationSchema={Yup.object({
            campeones: Yup.number().required("Es obligatorio poner el numero de campeones que tiene la cuenta"),
            aspectos: Yup.number().required("Es obligatorio poner el numero de aspectos que tiene la cuenta"),
            rango_temporada_pasada: Yup.string().oneOf(rangos).required("El Rango de la temporada pasada es obligatorio ponerlo"),
            email_verificado: Yup.boolean().required("Es obligatorio poner un valor"),
            nivel_cuenta: Yup.number().required("Obligatorio poner el nivel de la cuenta").min(1,"Tiene que ser minimo nivel 1"),
            riot_points: Yup.number().required("Es obligatorio poner los riot points"),
            esencia_azul: Yup.number().required("Es obligatorio poner la esencia Azul"),
            correo_cuenta: Yup.string().required("Es obligatorio poner el correo de la cuenta").email("Tiene que ser un email"),
            contraseña_cuenta: Yup.string().required("Es obligatorio poner la contraseña de la cuenta").min(8,"Tiene que tener 8 caracteres como minimo"),
            nombre_invocador: Yup.string().required("Es obligatorio poner el nombre de invocador").min(5,"necesita tener minimo 5 caracteres")
          })

          }
          
          onSubmit={(values, actions) =>{
            let numerorangoinicial
        let numerorangofinal
        switch (values.rango_temporada_pasada) {
          case "Hierro4":numerorangoinicial=2
            break
            case "Hierro3":numerorangoinicial=3
            break
            case "Hierro2":numerorangoinicial=4
            break;
            case "Hierro1":numerorangoinicial=5
            break;
            case "Bronce4":numerorangoinicial=6
            break;
            case "Bronce3":numerorangoinicial=7
            break;
            case "Bronce2":numerorangoinicial=8
            break;
            case "Bronce1":numerorangoinicial=9
            break;
            case "Plata4":numerorangoinicial=10
            break;
            case "Plata3":numerorangoinicial=11
            break;
            case "Plata2":numerorangoinicial=12
            break;
            case "Plata1":numerorangoinicial=13
            break;
            case "Oro4":numerorangoinicial=14
            break;
            case "Oro3":numerorangoinicial=15
            break;
            case "Oro2":numerorangoinicial=16
            break;
            case "Oro1":numerorangoinicial=17
            break;
            case "Platino4":numerorangoinicial=18
            break;
            case "Platino3":numerorangoinicial=19
            break;
            case "Platino2":numerorangoinicial=20
            break;
            case "Platino1":numerorangoinicial=21
            break;
            case "Diamante4":numerorangoinicial=22
            break;
            case "Diamante3":numerorangoinicial=23
            break;
            case "Diamante2":numerorangoinicial=24
            break;
            case "Diamante1":numerorangoinicial=25
            break;
            case "Maestro":numerorangoinicial=26
            break;
            case "GranMaestro":numerorangoinicial=27
            break;
            case "Aspirante":numerorangoinicial=28
            break;
          default: numerorangoinicial=1
            break;
        }
        switch (values.rango_temporada_actual) {
          case "Hierro4":numerorangofinal=2
            break
            case "Hierro3":numerorangofinal=3
            break
            case "Hierro2":numerorangofinal=4
            break;
            case "Hierro1":numerorangofinal=5
            break;
            case "Bronce4":numerorangofinal=6
            break;
            case "Bronce3":numerorangofinal=7
            break;
            case "Bronce2":numerorangofinal=8
            break;
            case "Bronce1":numerorangofinal=9
            break;
            case "Plata4":numerorangofinal=10
            break;
            case "Plata3":numerorangofinal=11
            break;
            case "Plata2":numerorangofinal=12
            break;
            case "Plata1":numerorangofinal=13
            break;
            case "Oro4":numerorangofinal=14
            break;
            case "Oro3":numerorangofinal=15
            break;
            case "Oro2":numerorangofinal=16
            break;
            case "Oro1":numerorangofinal=17
            break;
            case "Platino4":numerorangofinal=18
            break;
            case "Platino3":numerorangofinal=19
            break;
            case "Platino2":numerorangofinal=20
            break;
            case "Platino1":numerorangofinal=21
            break;
            case "Diamante4":numerorangofinal=22
            break;
            case "Diamante3":numerorangofinal=23
            break;
            case "Diamante2":numerorangofinal=24
            break;
            case "Diamante1":numerorangofinal=25
            break;
            case "Maestro":numerorangofinal=26
            break;
            case "GranMaestro":numerorangofinal=27
            break;
            case "Aspirante":numerorangofinal=28
            break;
          default: numerorangofinal=1
            break;
        }
            values.titulo=" Actual Season "+values.rango_temporada_actual+" Last Season "+values.rango_temporada_pasada+" Lvl "+values.nivel_cuenta
            let precio = 0
            precio += (values.campeones*0.5)/100
            precio += (values.aspectos*0.5)/100
            precio += (values.esencia_azul*0.1)/100
            precio += (values.riot_points*0.25)/100
            if(values.email_verificado==true){
              precio += 0.5
            }else{
              values.email_verificado=false
              precio += 5
            }
            precio += numerorangoinicial*2/2
            precio += numerorangofinal*2

            values.precio=precio
            console.log(values)
            const token=localStorage.getItem("TokenUsuario")
            toast((t) =>(
              <div className='text-xl text-white'>
                  <p>¿Desea vender su cuenta a este precio? "Obtendra el dinero en cuanto le compren la cuenta" <strong>{values.precio}€</strong></p>
                  <br></br>
                  <div>
                      <button className='bg-orange-500 hover:bg-orange-400 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                        let precio = values.precio
                        precio = 0
                        precio += (values.campeones*0.5)/100
                        precio += (values.aspectos*0.5)/100
                        precio += (values.esencia_azul*0.1)/100
                        precio += (values.riot_points*0.25)/100
                        if(values.email_verificado===true){
                          precio += 0.5
                        }else{
                          precio += 5
                        }
                        precio += numerorangoinicial*2/2
                        precio += numerorangoinicial*2
                        values.precio=precio
                       axios.post("/cuentas",values,{ headers: {"x-access-token" : `${token}`} })
                       .then(res => {console.log(res.status);
                       if(res.status===200){
                        toast.dismiss()
                         toast.success("Subida de cuenta Correcta",{duration:2500})
                         navigate('/cuentas')
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
                           toast.error(error.response.data)
                         }else{
                           console.log(error)
                           toast.error("Hubo un error")
                         }
                     })
                      }}>¡Vender Ya!</button>
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
          }}
        >
          {({handleSubmit}) =>(
             <Form onSubmit={handleSubmit}>
              <label>Campeones</label><br></br>
             <Field name="campeones" placeholder="campeones"  className='text-black'/>
             <ErrorMessage name='campeones' className='text-red-900' component="p"></ErrorMessage>
             <br/>
             <label>Aspectos</label><br></br>
             <Field name="aspectos" placeholder="aspectos"  className='text-black'/><br/>
             <ErrorMessage name='aspectos' className='text-red-900' component="p"></ErrorMessage><br></br>
             <label>Rango temporada pasada</label><br></br>
             <Field component="select" name="rango_temporada_pasada" className='text-black'>
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
              <ErrorMessage name='rango_temporada_pasada' className='text-red-900' component="p"></ErrorMessage><br/>
              <label>Rango temporada Actual</label><br></br>
              <Field component="select" name="rango_temporada_actual" className='text-black'>
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
              <ErrorMessage name='rango_temporada_actual' className='text-red-900' component="p"></ErrorMessage><br/>
              <label> Email verificado</label>
             <Field name="email_verificado" placeholder="email_verificado" component="select"  className='text-black'>
               <option value="True">True</option>
               <option value="False">False</option>
              </Field>
              <br/>
              <label>Nivel de la cuenta</label><br></br>
             <Field name="nivel_cuenta" placeholder="nivel_cuenta" className='text-black'/><br/>
             <ErrorMessage name='nivel_cuenta' className='text-red-900' component="p"></ErrorMessage><br/>
             <label>Riot points</label><br></br>
             <Field name="riot_points" placeholder="riot_points" className='text-black' /><br/>
             <ErrorMessage name='riot_points' className='text-red-900' component="p"></ErrorMessage><br></br>
             <label>Esencia Azul</label><br></br>
             <Field name="esencia_azul" placeholder="esencia_azul" className='text-black'/><br/>
             <ErrorMessage name='esencial_azul' className='text-red-900' component="p"></ErrorMessage><br></br>
             <label>Correo Cuenta</label><br></br>
             <Field name="correo_cuenta" placeholder="correo_cuenta" className='text-black'/><br/>
             <ErrorMessage name='correo_cuenta' className='text-red-900' component="p"></ErrorMessage><br></br>
             <label>Contraseña Cuenta</label><br></br>
             <Field name="contraseña_cuenta" placeholder="contraseña_cuenta" type="password" className='text-black'/><br/>
             <ErrorMessage name='contraseña_cuenta' className='text-red-900' component="p"></ErrorMessage><br></br>
             <label>Nombre Invocador</label><br></br>
             <Field name="nombre_invocador" placeholder="nombre_invocador" className='text-black'/><br/>
             <ErrorMessage name='nombre_invocador' className='text-red-900' component="p"></ErrorMessage><br></br>
             <button type='submit' className='bg-indigo-600 hover:bg-indigo-500 text-3xl mt-10 mb-10'>Subir Cuenta</button>
         </Form>
          )}
           
        </Formik>
    </div></div>
    
  )
}

export default CrearCuenta