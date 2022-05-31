import eloboosts from "../models/eloboosts.js"
export const getEloboosts =  async (req, res) => {
    try {
        const Obtenereloboosts = await eloboosts.find()
        res.send(Obtenereloboosts)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
}
export const getEloboost = async (req, res) => {
    try {
        const Obtenereloboost = await eloboosts.findById(req.params.id)
    if (!Obtenereloboost){
        return res.sendStatus(404)
    }else{
        return res.json(Obtenereloboost)
    }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}
export const createEloboost = async (req, res) => {
    try {
    const {titulo,liga_inicio,liga_deseada,precio,id_booster,id_cliente,nombre_cuenta,passwd_cuenta,roles_preferidos,campeones_preferidos,activo} = req.body

    const nuevoBoost = new eloboosts({titulo,liga_inicio,liga_deseada,precio,id_booster,id_cliente,nombre_cuenta,passwd_cuenta,roles_preferidos,campeones_preferidos,activo})
    
    await nuevoBoost.save()
    return res.send(nuevoBoost)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}
export const updateEloboost = async (req, res) => {
    try {
        const actualizarBoost = await eloboosts.findByIdAndUpdate(req.params.id, req.body, {new: true})
    console.log(actualizarBoost)
    return res.send(actualizarBoost)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const deleteEloboost = async (req, res) => {
    try {
        const eliminarBoost = await eloboosts.findByIdAndDelete(req.params.id)

    if(!eliminarBoost) return res.sendStatus(404)

    return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}