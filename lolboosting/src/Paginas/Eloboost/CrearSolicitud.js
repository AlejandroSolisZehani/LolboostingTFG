import React, {useEffect}from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function CrearSolicitud() {
    useEffect(()=>{
        if(localStorage.getItem("IdUsuario")==null||localStorage.getItem("TokenUsuario")==null){
          navigate("/login")
        }
      },[])
    const navigate = useNavigate()
    const rangos = ["Sinrango","Hierro4","Hierro3","Hierro2","Hierro1","Bronce4","Bronce3","Bronce2","Bronce1","Plata4","Plata3","Plata2","Plata1","Oro4","Oro3","Oro2","Oro1","Platino4",
    "Platino3","Platino2","Platino1","Diamante4","Diamante3","Diamante2","Diamante1","Maestro","GranMaestro","Aspirante"]
    const roles = ["Top","Jungler","Mid","Adc","Support"]
  return (
    <div className='divBox flex items-center justify-center text-white mb-10'>
        <Formik
        initialValues={{
            titulo: '',
            liga_inicio: '',
            liga_deseada: '',
            precio: 0,
            rol_preferido: '',
            id_booster: '',
            id_cliente: localStorage.getItem("IdUsuario"),
            nombre_cuenta: '',
            passwd_cuenta: '',
            campeon_preferido: '',
            activo: true

        }}
        validationSchema={Yup.object({
          liga_inicio: Yup.string().required("El rango inicial es obligatorio ponerlo").oneOf(rangos,"Escoge un rango Inicial"),
          liga_deseada: Yup.string().required("El rango desesado es obligatorio ponerlo").oneOf(rangos,"Escoge un rango deseado"),
          rol_preferido: Yup.string().required("Es obligatorio poner el rol preferido").oneOf(roles,"Escoge un rol"),
          nombre_cuenta: Yup.string().required("Es obligatorio poner el nombre de usuario de la cuenta").min(5,"Es obligatorio que tenga una longitud minima de 5"),
          passwd_cuenta: Yup.string().required("Es obligatorio poner el nombre de usuario de la cuenta").min(5,"Es obligatorio que tenga una longitud minima de 5"),
          campeon_preferido: Yup.string().required("Es obligatorio poner un campeon preferido").min(3,"Tiene que tener minimo una longitud de 3")

        })
      }
      onSubmit={(values, actions) =>{
        console.log(values)
        let numerorangoinicial
        let numerorangofinal
        switch (values.liga_inicio) {
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
        switch (values.liga_deseada) {
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
        if(numerorangoinicial>numerorangofinal || numerorangofinal===numerorangoinicial){
          toast.error("No puede haber un rango inicial superior o igual al rango deseado")
        }else{
          values.titulo="De "+values.liga_inicio+" A "+values.liga_deseada
          values.precio=(numerorangofinal-numerorangoinicial)*5
          console.log(values)
          toast((t) =>(
            <div className='text-xl text-white'>
                <p>¿Desea contratar nuestro servicio de boost? <strong>{values.precio}€</strong></p>
                <br></br>
                <div>
                    <button className='bg-orange-500 hover:bg-orange-400 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                      axios.post("/eloboosts",values,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                      .then(res => {
                        console.log(res)
                        if(res.status===200){
                          console.log(res)
                          toast.dismiss()
                          toast.success("Se ha solicitado el servicio de eloboost correctamente")
                          navigate("/boost")
                          
                        }
                      })
                      .catch(error => {
                        console.log(error)
                        if(error.response.data.message==="jwt expired"){
                          toast.error("Sesión Cerrada vuelve a Loggearte")
                          localStorage.clear()
                          navigate("/login")
                      }
                      })
                    }}>¡Boosteame!</button>
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
              <label>Rango Actual</label><br></br>
             <Field component="select" name="liga_inicio" className='text-black'>
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
              <ErrorMessage name='liga_inicio' className='text-red-900' component="p"></ErrorMessage><br/>
              <label>Rango Deseado</label><br></br>
             <Field component="select" name="liga_deseada" className='text-black'>
               <option defaultValue="Seleccioneunaopcion">Seleciona una opcion</option>
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
              <ErrorMessage name='liga_deseada' className='text-red-900' component="p"></ErrorMessage><br/>
              <label>Rol Preferido</label><br></br>
             <Field component="select" name="rol_preferido" className='text-black'>
               <option defaultValue="Seleccioneunaopcion">Seleciona una opcion</option>
                <option value="Top">Toplane</option>
                <option value="Jungler">Jungla</option>
                <option value="Mid">Medio</option>
                <option value="Adc">Tirador</option>
                <option value="Support">Soporte</option>
             
              </Field><br/>
              <ErrorMessage name='rol_preferido' className='text-red-900' component="p"></ErrorMessage><br/>
              <label>Nombre de la cuenta</label><br/>
              <Field name="nombre_cuenta" className='text-black' placeholder='Nombre cuenta'></Field><br/>
              <ErrorMessage name='nombre_cuenta' className='text-red-900' component="p"></ErrorMessage><br/>
              <label>Contraseña de la cuenta</label><br/>
              <Field name="passwd_cuenta" className='text-black'></Field><br/>
              <ErrorMessage name='passwd_cuenta' className='text-red-900' component="p"></ErrorMessage><br/>
              <label>Campeon / Campeones Preferidos</label><br/>
              <Field name="campeon_preferido" className='text-black' placeholder='Skarner'></Field><br/>
              <ErrorMessage name='campeon_preferido' className='text-red-900' component="p"></ErrorMessage><br/>
             <button type='submit' className='bg-indigo-600 hover:bg-indigo-500 text-3xl mt-10 mb-10'>Pagar Servicio</button>
         </Form>
          )}
        </Formik>
    </div>
  )
}

export default CrearSolicitud