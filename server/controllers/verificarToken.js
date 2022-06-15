import jsonwebtoken from "jsonwebtoken"
import secret from "../config.js"

export default function verificartoken (req, res, next){
    try{
        const token = req.headers['x-access-token']
        if(!token){
            return res.status(401).json({
                auth: false,
                message: 'no token providded'
            })
        }
        const decoded = jsonwebtoken.verify(token, secret)
        req.UsuariosId = decoded.id
        next()
    }catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}