import maestrias from "../models/maestrias.js"
export const getMaestrias =  async (req, res) => {
    try {
        const ObtenerMaestrias = await maestrias.find()
        res.send(ObtenerMaestrias)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
}

export const getMaestria = async (req, res) => {
    try {
        const ObtenerMaestria = await maestrias.findById(req.params.id)
    if (!ObtenerMaestria){
        return res.sendStatus(404)
    }else{
        return res.json(ObtenerMaestria)
    }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const createMaestria = async (req, res) => {
    try {
        const {titulo,campeon,nivel_maestria_actual,maestria_deseada,precio,nombre_cuenta,passwd_cuenta,id_booster,id_cliente,activo} = req.body
    const nuevaMaestria = new maestrias({titulo,campeon,nivel_maestria_actual,maestria_deseada,precio,nombre_cuenta,passwd_cuenta,id_booster,id_cliente,activo})

    console.log(nuevaMaestria)
    await nuevaMaestria.save()
    return res.send(nuevaMaestria)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const updateMaestria = async (req, res) => {
    try {
        const actualizarMaestria = await maestrias.findByIdAndUpdate(req.params.id, req.body, {new: true})
    console.log(actualizarMaestria)
    return res.send(actualizarMaestria)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const deleteMaestria = async (req, res) => {
    try {
        const eliminarMaestria = await maestrias.findByIdAndDelete(req.params.id)

    if(!eliminarMaestria) return res.sendStatus(404)

    return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}