import pedidos from "../models/pedidos"
export const getPedidos =  async (req, res) => {
    try {
        const Obtenerpedidos = await pedidos.find()
        res.send(Obtenerpedidos)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
}
export const getpedido = async (req, res) => {
    try {
        const Obtenerpedido = await pedidos.findById(req.params.id)
    if (!Obtenerpedido){
        return res.sendStatus(404)
    }else{
        return res.json(Obtenerpedido)
    }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}
export const createPedido = async (req, res) => {
    try {
    const {id_producto_servicio,id_cliente,cantidad,estado,fecha_inicio_pedido,fecha_entrega_prevista} = req.body

    const nuevoPedido = new pedidos({id_producto_servicio,id_cliente,cantidad,estado,fecha_inicio_pedido,fecha_entrega_prevista})
    
    await nuevoPedido.save()
    return res.send(nuevoPedido)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}
export const updatePedido = async (req, res) => {
    try {
        const actualizarPedido = await pedidos.findByIdAndUpdate(req.params.id, req.body, {new: true})
    console.log(actualizarPedido)
    return res.send(actualizarPedido)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const deletePedido = async (req, res) => {
    try {
        const eliminarPedido = await pedidos.findByIdAndDelete(req.params.id)

    if(!eliminarPedido) return res.sendStatus(404)

    return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}