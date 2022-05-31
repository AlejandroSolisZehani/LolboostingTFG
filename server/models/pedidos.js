import mongoose from "mongoose";
const pedidosSchema = new mongoose.Schema({
    id_producto_servicio:{
        type: String,
        required: true,
        trim: true
    },
    id_cliente:{
        type: String,
        required: true,
        trim: true
    },
    cantidad:{
        type: Number,
        required: true
    },
    estado:{
        type: String,
        required:true,
        trim: true,
    },
    fecha_inicio_pedido:{
        type: Date,
        required: true
    },
    fecha_entrega_prevista:{
        type: Date,
        required:true,
    },
    fecha_entrega:{
        type: Date
    }

})
export default mongoose.model("Pedidos", pedidosSchema)