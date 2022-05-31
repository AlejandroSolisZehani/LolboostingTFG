import Productos from "./productos"
import eloboost from "./eloboosts"
import coachings from "./coachings"
import maestrias from "./maestrias";
import cuentas from "./cuentas";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import pedidos from "./pedidos";
const usuariosSchema = new mongoose.Schema({
    nombre_usuario: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    url_imagen:{
        type: String,
        required: true,
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
    carrito_cuentas:{
        type: [cuentas]
    },
    carrito_productos:{
        type: [Productos]
    },
    historial_maestrias:{
        type: [maestrias]
    },
    historial_coachings:{
        type: [coachings]
    },
    historial_eloboosts:{
        type: [eloboost]
    },
    historial_pedidos:{
        type: [pedidos]
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