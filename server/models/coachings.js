import mongoose from "mongoose";

const coachingSchema = new mongoose.Schema({
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
    roles_preferidos: {
        type: String,
        required: true,
        trim: true
    },
    idioma: {
        type: String,
        required: true,
        trim: true
    },
    partidas: {
        type: Number,
        required: true
    },
    id_cliente: {
        type: String,
        trim: true
    },
    id_booster: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true
    },
    activo: {
        type: Boolean,
        required: true
    },
    correo_coach:{
        type: String,
        required: true,
        trim: true
    }
})

export default mongoose.model("Coaching", coachingSchema)