import React, {useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import TarjetasProductos from '../../Componentes/Productos/TarjetasProductos'

export default function VerTodoslosProductos() {
  const navigate = useNavigate()
  const [Producto, setProducto] = useState([])
  useEffect(()=>{
    if(localStorage.getItem("IdUsuario")==null || localStorage.getItem("TokenUsuario")==null){
      navigate("/login")
    }else{
      axios.get(`/productos`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
      .then(res => {
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
        }else{
            toast.error("Hubo un error")
        }
    })
    }
  },[])
  if(Producto.filter(Producto => Producto.activo===true).length===0){
    return <div>No hay Productos todavia :/ </div>
  }else{
      return <div className='grid grid-cols-1 gap-10'>
            {Producto.filter(Producto=> Producto.activo===true).map(Producto=>(
                <TarjetasProductos Productos={Producto} key={Producto._id}/>
            ))}
    
        </div>
    
  }
  
}
