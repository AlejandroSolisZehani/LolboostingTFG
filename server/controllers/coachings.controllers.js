import coachings from "../models/coachings.js"
export const getCoachings =  async (req, res) => {
    try {
        const obtenercoachings = await coachings.find()
        res.send(obtenercoachings)
        } catch (error) {
            return res.status(500).json({message: error.message})
    }
}
export const getCoaching = async (req, res) => {
    try {
        const obtenercoach = await coachings.findById(req.params.id)
    if (!obtenercoach){
        return res.sendStatus(404)
    }else{
        return res.json(obtenercoach)
    }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const createCoaching = async (req, res) => {
    try {
        const {titulo,servidor,roles_preferidos,idioma,partidas,id_cliente,id_booster,precio,activo} = req.body
    const nuevocoaching = new coachings({titulo,servidor,roles_preferidos,idioma,partidas,id_cliente,id_booster,precio,activo})

    console.log(nuevocoaching)
    await nuevocoaching.save()
    return res.send(nuevocoaching)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const updateCoaching = async (req, res) => {
    try {
        const actualizarcoaching = await coachings.findByIdAndUpdate(req.params.id, req.body, {new: true})
    console.log(actualizarcoaching)
    return res.send(actualizarcoaching)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const deleteCoaching = async (req, res) => {
    try {
        const eliminarcoaching = await coachings.findByIdAndDelete(req.params.id)

    if(!eliminarcoaching) return res.sendStatus(404)

    return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}