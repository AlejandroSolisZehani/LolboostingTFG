import mongoose from "mongoose";

const maestriasSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    campeon:{
        type: String,
        required: true,
        trim: true
    },
    nivel_maestria_actual:{
        type: Number,
        required: true
    },
    maestria_deseada:{
        type: Number,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    nombre_cuenta:{
        type: String,
        required: true,
        trim: true
    },
    passwd_cuenta:{
        type: String,
        required: true,
        trim: true
    },
    id_booster: {
        type: String,
        trim: true
    },
    id_cliente: {
        type: String,
        required: true,
        trim: true
    },activo: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model("Maestrias", maestriasSchema)