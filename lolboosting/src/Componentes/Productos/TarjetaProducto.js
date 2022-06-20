import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function TarjetaProducto({Producto}) {
  
  const navigate = useNavigate()
  const [Usuario, setUsuario] = useState([])
 
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null || localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }else{
      axios.get(`/usuarios/${localStorage.getItem("IdUsuario")}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
      .then(res =>{
        console.log(res)
        if(res.status===200){
          setUsuario(res.data)
        }
      })
      .catch(error =>{
        console.log(error)
        if(error.response.status===500){
          toast.error("Hubo un error y no se ha encontrado al usuario")
          navigate("/")
        }
      })
    }
  },[])
  function guardarProducto(_id,cantidad){
    var productos = JSON.parse(localStorage.getItem("Carrito") || '[]')
    var producto = {
      _id:_id,
      cantidad:cantidad
    }
    let existe=false;
    productos.forEach(element => {
      if(element._id === _id){
        existe=true
        element.cantidad++
      }
    });
    if(!existe){
      productos.push(producto)
      toast.success("Se ha añadido al carrito")
    }else{
      toast.success("Se ha añadido una unidad mas al carrito",{style:{background:"#5cfaff"}})
    }

    localStorage.setItem("Carrito",JSON.stringify(productos))
  }
  if(Usuario.roles=='Admin'){
    return (
      <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
      hover:bg-zinc-700 hover:cursor-pointer'>
        <div>
          <p className='flex justify-center text-2xl'>{Producto.titulo}</p>
          <h1 className='flex justify-center'>Descripcion:</h1>
          <p className='flex justify-center'>{Producto.detalles}</p>
          <div className='flex justify-center '>
          <img src={Producto.imagenes} alt='Imagen del producto' className='w-96'/>
          </div>
          
          <p className='flex justify-center'>{Producto.precio}€</p>
          <div className='flex justify-center '>
          <button className='flex justify-center bg-indigo-600 text-xl px-2 py-1 rounded-sm' onClick={()=>{
            navigate(`/editarproducto/${Producto._id}`)
          }}>Editar</button>
          </div>
          <div className='flex justify-center'>
          <button className='flex justify-center bg-red-500 text-xl px-2 py-1 rounded-sm' onClick={()=>{
            toast((t) =>(
              <div className='text-xl text-white'>
                  <p>¿Quieres eliminar el producto?</p>
                  <br></br>
                  <div>
                      <button className='bg-red-500 hover:bg-red-400 px-3 py-2 rounded-sm mx-2' onClick={(t)=>{
                        axios.delete(`/productos/${Producto._id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                        .then(res =>{
                          console.log(res)
                          if(res.status===204){
                            toast.dismiss()
                            toast.success("Se ha eliminado correctamente")
                            navigate("/productos")
                          }
                        })
                        .catch(error =>{
                          console.log(error)
                          if(error.response.status===404){
                            toast.error("No se ha encontrado el producto para borrar")
                          }else if(error.response.status===500){
                            toast.error("No se ha podido borrar por un error en el servidor, procura hacerlo mas tarde")
                          }else if(error.response.data.message==="jwt expired"){
                            toast.dismiss()
                            toast.error("Sesión Cerrada vuelve a Loggearte")
                            localStorage.clear()
                            navigate("/login")
                          }
                        })
                      }}>Eliminar</button>
                      <button className='flex- justify-center bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2' onClick={()=>{toast.dismiss(t.id)}}>Cancelar</button>
                  </div>
              </div>
          ),{
              style: {
                  background: "#202020"
              }
          })
          }}>Eliminar</button>
          </div>
        </div>
      </div>
    )
  }else{
    return (
      <div className='bg-zinc-800 text-white rounded-sm shadow-sm shadow-black
      hover:bg-zinc-700 hover:cursor-pointer'>
        <div>
          <div>
          <p className='flex justify-center'>{Producto._id}</p>
          <h1 className='flex justify-center'>{Producto.titulo}</h1>
          <div className='flex justify-center'>
          <img src={Producto.imagenes} alt='Imagen del producto' className='flex justify-center w-96'/>
          </div>
          <p className='flex justify-center'>{Producto.precio}€</p>
          <div className='flex justify-center'>
          <button className='flex justify-center bg-orange-500 text-xl px-2 py-1 rounded-sm' onClick={()=>{
            guardarProducto(Producto._id,1)
            navigate("/productos")
          }}>Comprar</button>
          </div>
        </div>
        </div>
      </div>
    )
  }
  
  
}

export default TarjetaProducto