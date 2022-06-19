import React, {useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import { useNavigate } from 'react-router-dom'
function PasarSaldo() {
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState([])
    useEffect(()=>{
        if(localStorage.getItem("TokenUsuario"==null) || localStorage.getItem("IdUsuario")==null){
            navigate("/login")
        }else{
            axios.get(`/usuarios/${localStorage.getItem("IdUsuario")}`,{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
            .then(res =>{
                console.log(res)
                if(res.status===200){
                    setUsuario(res.data)
                }
            })
            .catch(error => console.log(error))
        }
    },[])
  return (

    <div>
        <button className='bg-orange-500 hover:bg-orange-500' onClick={()=>{
            toast((t) =>(
                <div className='text-xl text-white'>
                    <p>Seguro que desea Transferir saldo?</p>
                    <br></br>
                    <div>
                        <button className='bg-red-500 hover:bg-red-500 px-3 py-2 rounded-sm mx-2' onClick={()=>{
                          axios.put(`/usuarios/${localStorage.getItem("IdUsuario")}`,{saldo:0},{ headers: {"x-access-token" : `${localStorage.getItem("TokenUsuario")}`} })
                          .then(res => {
                            if(res.status===200){
                                if(usuario.saldo===0){
                                    toast.dismiss(t.id)
                                    toast.error("No tienes suficiente Saldo")
                                    navigate("/miperfil")
                                }else{
                                    
                              toast.dismiss()
                              toast.success("Saldo transferido")
                              navigate("/miperfil")
                                }
                              
                            }
                          })
                          .catch(error => console.log(error))
                        }}>Transferir</button>
                        <button className='bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2' onClick={()=>{toast.dismiss(t.id)}}>Cancelar</button>
                    </div>
                </div>
            ),{
                style: {
                    background: "#202020"
                }
            })
        }}>Transferir Saldo</button>
        <button  className='bg-slate-400 hover:bg-slate-500' onClick={()=>{navigate("/miperfil")}}>Volver</button>
    </div>
  )
}

export default PasarSaldo