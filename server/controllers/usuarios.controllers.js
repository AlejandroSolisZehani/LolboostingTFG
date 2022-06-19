import Usuarios from "../models/usuarios.js"
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs";
import secret from "../config.js"
export const getUsuarios = async (req, res) => {
    try {
        const ObtenerUsuarios = await Usuarios.find()
        res.send(ObtenerUsuarios)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
}
export const getUsuario = async (req, res) => {
    try {
        
        
        const ObtenerUsurio = await Usuarios.findById(req.params.id)
    if (!ObtenerUsurio){
        return res.sendStatus(404)
    }else{
        return res.json(ObtenerUsurio)
    }
    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}
export const createUsuario = async (req, res) => {
    try {
        const {nombre_usuario,url_imagen,contraseña_usuario,telefono_usuario,email_usuario,direccion,roles,saldo} = req.body
    const nuevoUsuario = new Usuarios({nombre_usuario,url_imagen,contraseña_usuario,telefono_usuario,email_usuario,direccion,roles,saldo})
    nuevoUsuario.contraseña_usuario = await nuevoUsuario.encryptPassword(nuevoUsuario.contraseña_usuario)
    console.log(nuevoUsuario)
    await nuevoUsuario.save()
    const token = jsonwebtoken.sign({id: nuevoUsuario._id}, secret, {
        expiresIn: 60 * 60 * 24 * 7
    })
    res.json({auth: true, token: token})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const updateUsuario = async (req, res) => {
    try {
        const actualizarUsuario = await Usuarios.findByIdAndUpdate(req.params.id, req.body, {new: true})
        //const actualizarUsuario = await Usuarios.findByIdAndUpdate(req.params.id, req.body, {new: true})
    console.log(actualizarUsuario)
    return res.send(actualizarUsuario)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const deleteUsuario = async (req, res) => {
    try {
        const eliminarUsuarios = await Usuarios.findByIdAndDelete(req.params.id)

    if(!eliminarUsuarios) return res.sendStatus(404)

    return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const getmiperfil = async (req, res) =>{
    try {
        const ObtenerUsurio = await Usuarios.findById(req.UsuariosId, {contraseña_usuario: 0})
    if (!ObtenerUsurio){
        return res.sendStatus(404).send('Usuario no encontrado')
    }else{
        return res.json(ObtenerUsurio)
    }
    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const login = async (req, res) =>{
    try {
        const {email_usuario, contraseña_usuario} = req.body
        const user = await Usuarios.findOne({email_usuario: email_usuario})
        if(!user){
            return res.status(404).json({message:'Email no registrado'})
        }
        const contraseñavalida = await user.validatePassword(contraseña_usuario)
        if(!contraseñavalida) {
            res.status(401).json({auth: false, token: null, message: "Contraseña no valida"})
        }else{
            const token = jsonwebtoken.sign({id: user._id}, secret, {
                expiresIn: 60 * 60 *24
            })
            const id = jsonwebtoken.decode(token)
            res.json({auth: true, token, id})
        }

       
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}