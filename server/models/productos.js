import mongoose from "mongoose";
const productosSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true,
    },
    detalles: {
        type: String,
        required: true,
    },
    imagenes: {
        type: [String],
        required: true,
        trim: true
    },
    id_cliente: {
        type: [String]
    },activo: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model("Productos", productosSchema)