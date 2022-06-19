import productos from "../models/productos.js"
export const getProductos =  async (req, res) => {
    try {
        const ObtenerProductos = await productos.find()
        res.send(ObtenerProductos)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
}
export const getProducto = async (req, res) => {
    try {
        const ObtenerProducto = await productos.findById(req.params.id)
    if (!ObtenerProducto){
        return res.sendStatus(404)
    }else{
        return res.json(ObtenerProducto)
    }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const createProducto = async (req, res) => {
    try {
        const {titulo,precio,detalles,imagenes,activo} = req.body
    const nuevoProducto = new productos({titulo,precio,detalles,imagenes,activo})

    console.log(nuevoProducto)
    await nuevoProducto.save()
    return res.send(nuevoProducto)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const updateProducto = async (req, res) => {
    try {
        const actualizarProducto = await productos.findByIdAndUpdate(req.params.id, req.body, {new: true})
    console.log(actualizarProducto)
    return res.send(actualizarProducto)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const deleteProducto = async (req, res) => {
    try {
        const eliminarProducto = await productos.findByIdAndDelete(req.params.id)

    if(!eliminarProducto) return res.sendStatus(404)

    return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}