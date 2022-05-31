import mongoose from "mongoose";

const eloboostSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    liga_inicio: {
        type: String,
        required: true,
        trim: true
    },
    liga_deseada: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true
    },
    roles_preferidos: {
        type: [String],
        required: true,
        trim: true
    },
    id_booster: {
        type: String,
        required: true,
        trim: true
    },
    id_cliente: {
        type: String,
        trim: true
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
    campeones_preferidos:{
        type: [String],
        required: true,
        trim: true
    },
    activo: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model("Eloboost", eloboostSchema)