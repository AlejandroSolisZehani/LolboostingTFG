import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CarritoComponente from './CarritoComponente'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
function Carrito() {
    const navigate = useNavigate()
    const [carrito, setCarrito] = useState([])
    useEffect(()=>{
        if(localStorage.getItem("IdUsuario")==null || localStorage.getItem("TokenUsuario")==null){
            navigate("/login")
        }else{
            setCarrito(JSON.parse(localStorage.getItem("Carrito")))
        }
    },[])

  if(localStorage.getItem("Carrito")==0 || localStorage.getItem("Carrito")==null){
    return <div> 
        <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/carrito'>Carrito</Link></div>
        Todavia no hay nada en el carrito</div>
  }else{
    return <>
        <div className='container'> 
        <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/carrito'>Carrito</Link></div>
        {carrito.map(Carrito=>(
            <div className='grid grid-cols-1'>
            <CarritoComponente Valor={Carrito} key={Carrito._id}/>
            </div>
        ))}
        <div className='flex justify-center'><button className='bg-orange-300 w-full' onClick={()=>{
            toast.success("Se han comprado todos los productos Superiores a 0")
            localStorage.removeItem("Carrito")
            navigate("/carrito")
        }}>Comprar</button></div>
        
    </div>
    </>
  }
}

export default Carrito