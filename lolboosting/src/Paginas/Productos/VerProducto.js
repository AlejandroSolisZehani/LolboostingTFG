import React, {useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import TarjetaProducto from '../../Componentes/Productos/TarjetaProducto'

export default function VerProducto() {
  const navigate = useNavigate()
  const params = useParams()
  const [Producto, setProducto] = useState([])
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null || localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }else{
      axios.get(`/productos/${params.id}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
      .then(res =>{
        console.log(res)
        if(res.status===200){
          setProducto(res.data)
        }
      })
      .catch(error => {
        console.log(error)
        if(error.response.data.message==="jwt expired"){
            toast.error("Sesión Cerrada vuelve a Loggearte")
            localStorage.clear()
            navigate("/login")
        }else if(error.response.status===404){
          toast.error("No se ha encontrado")
        }else{
          toast.error("Hubo un error")
        }
    })
    }
  },[])
  if(Producto.length===0){
    return <div>
       <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/productos'>Productos</Link>/Ver Producto</div>
      No se ha encontrado el Producto</div>
  }else if(Producto.activo===false){
    return <div>
      <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/productos'>Productos</Link>/Ver Producto</div>
      Este Producto ya no esta disponible</div>
  }else{
    return<div>
    <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/productos'>Productos</Link>/Ver Producto</div>
  
     <div className='grid grid-cols-1 gap-10 mb-10'>
      <TarjetaProducto Producto={Producto} />
    </div>
    </div>
  }
}
