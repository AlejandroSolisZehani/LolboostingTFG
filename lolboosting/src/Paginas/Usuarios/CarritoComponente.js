import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
function CarritoComponente({Valor}) {
  const navigate = useNavigate()
  const [Producto, setProducto] = useState([])
  let [Cantidad, setCantidad] = useState([])
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null || localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }else{
      axios.get(`/productos/${Valor._id}`, { headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
      .then(res =>{
        console.log(res)
        if(res.status===200){
          setProducto(res.data)
        }
      })
      .catch(error => {
        console.log(error)
        toast.error("Hubo un error")
      })
      setCantidad(Valor.cantidad)
    }
  },[])
 console.log(Cantidad)
  return (
    <div className='flex justify-center text-center text-white'>
      <div>
      <img src={Producto.imagenes} className='w-96'/>
      <p>{Producto.titulo}</p>
      <p>{Producto.detalles}</p>
      <button className='bg-red-500 w-full' onClick={()=>{
        if(Cantidad>0){
          setCantidad(Cantidad--)
          setCantidad(Cantidad--)
        }

      }}>-</button>
      <p>Cantidad: {Cantidad}</p>
      <button className='bg-green-500 w-full' onClick={()=>{
        setCantidad(Cantidad++)
        setCantidad(Cantidad++)
      }}>+</button>
      <p>Precio: {Producto.precio}€</p>
      </div>
      
    </div>
  )
}

export default CarritoComponente