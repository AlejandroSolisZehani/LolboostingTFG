import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import TarjetasUsuarios from '../../Componentes/Admins/TarjetasUsuarios'
function Verusuarios() {
    const navigate = useNavigate()
    const [Usuarios, setUsuarios] = useState([])
    useEffect(()=>{
        if(localStorage.getItem("IdUsuario")==null || localStorage.getItem("TokenUsuario")==null){
            navigate("/login")
        }
        axios.get(`/usuarios/${localStorage.getItem("IdUsuario")}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(res =>{
            console.log(res)
            if(res.status===200){
                if(res.data.roles!='Admin'){
                    toast.error("No tienes permisos")
                    navigate('/miperfil')
                }
            }
        })
        .catch(error=>{
            console.log(error)
                if(error.response.data.message==="jwt expired"){
                    toast.error("Sesión Cerrada vuelve a Loggearte")
                    localStorage.clear()
                    navigate("/login")
                }else if(error.response.status===404){
                    toast.error("No se ha encontrado el usuario actual")
                    localStorage.clear()
                    navigate("/login")
                }else{
                    toast.error("Hubo un error")
                    navigate("/admin")
                }
        })
        axios.get("/usuarios",{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
        .then(res=>{
            console.log(res)
            if(res.status===200){
                setUsuarios(res.data)
            }
        })
        .catch(error=>{
            if(error.response.status===404){
                toast.error("No se ha encontrado nada")
                navigate("/admin")
            }
            else if(error.response.data.message==="jwt expired"){
            toast.error("Sesión Cerrada vuelve a Loggearte")
            localStorage.clear()
            navigate("/login")
        }else if(error.response.status===500){
                toast.error("Hubo un error en el servidor")
                navigate("/admin")
        }else{
            toast.error("Hubo un error")
            navigate("/admin")
        }
        })
    },[Usuarios])
  return (
    
        <div className='mb-10 gap-10 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2'>
            {Usuarios.map(Usuario=>(
                <TarjetasUsuarios Users={Usuario} key={Usuario._id}/>
            ))}
    
        </div>
  )
}

export default Verusuarios