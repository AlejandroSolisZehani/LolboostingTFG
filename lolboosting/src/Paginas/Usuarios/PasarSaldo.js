import React, {useEffect, useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

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
        <div className='text-2xl text-white'><Link to='/'>Lolboosting</Link>/<Link to='/miperfil'>Mi Perfil</Link>/Transferir Saldo</div>
    <div className='mt-40 mb-40 text-white'>
        
        <div className='flex justify-center mt-5 mb-5'>
        <h1 className='text-3xl'>Pasar saldo disponible a Cuenta</h1>
        </div>
        <div className='flex justify-center mt-5 mb-5'>
        <p>El saldo en la cuenta solo se puede retirar, es decir no puedes comprar ni productos ni servicios con este</p>
        </div>
        
    <div className='flex justify-center mt-5 mb-5'>
        <button className='bg-red-500 hover:bg-red-500 text-3xl' onClick={()=>{
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
        </div>
        <div className='flex justify-center mt-5 mb-5'>
        <button  className='bg-slate-400 hover:bg-slate-500 text-3xl' onClick={()=>{navigate("/miperfil")}}>Volver a mi perfil</button>
        </div>
    </div>
    </div>
  )
}

export default PasarSaldo