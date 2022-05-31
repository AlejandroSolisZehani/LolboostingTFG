import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const usuariosSchema = new mongoose.Schema({
    nombre_usuario: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    contraseña_usuario:{
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    telefono_usuario:{
        type: Number,
        unique: true,
        required: true
    },
    email_usuario:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    direccion:{
        type: String,
        required: true,
        trim: true
    },
    roles:{
        type: [String],
        required: true,
        trim: true
    },
    carrito:{
        type: []
    }
})

usuariosSchema.methods.encryptPassword = async (contraseña_usuario) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(contraseña_usuario, salt)
}

usuariosSchema.methods.validatePassword = function (contraseña){
    return bcrypt.compare(contraseña, this.contraseña_usuario)
}
export default mongoose.model("Usuarios", usuariosSchema)