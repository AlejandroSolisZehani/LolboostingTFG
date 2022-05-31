import mongoose from "mongoose";

const cuentasSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    servidor: {
        type: String,
        required: true,
        trim: true
    },
    campeones: {
        type: Number,
        required: true
    },
    aspectos: {
        type: Number,
        required: true
    },
    rango_temporada_pasada: {
        type: String,
        required: true,
        trim: true
    },
    email_verificado: {
        type: Boolean,
        required: true
    },
    nivel_cuenta: {
        type: Number,
        required: true,
    },
    rango_temporada_actual: {
        type: String,
        required: true,
        trim: true
    },
    riot_points: {
        type: Number,
        required: true
    },
    esencia_azul: {
        type: Number,
        required: true,
    },
    correo_cuenta:{
        type: String,
        required: true,
        trim: true
    },
    contraseña_cuenta:{
        type: String,
        required: true,
        trim: true
    },
    nombre_invocador:{
        type: String,
        required: true,
        trim: true
    },
    id_comprador:{
        type: String,
        trim: true
    },
    id_vendedor:{
        type: String,
        trim: true
    },
    activo: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model("Cuentas", cuentasSchema)