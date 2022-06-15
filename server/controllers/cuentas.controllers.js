import Cuentas from "../models/cuentas.js"
export const getCuentas = async (req, res) => {
    try {
    const obtenertodaslascuentas = await Cuentas.find()
    res.send(obtenertodaslascuentas)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const getCuenta = async (req, res) => {
    try {
        const obtenercuenta = await Cuentas.findById(req.params.id)
    if (!obtenercuenta){
        return res.sendStatus(404)
    }else{
        return res.json(obtenercuenta)
    }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}

export const createCuenta = async (req, res) => {
    try {
    const {titulo,servidor,campeones,aspectos,rango_temporada_pasada,email_verificado,nivel_cuenta,rango_temporada_actual,riot_points,esencia_azul,contraseña_cuenta,correo_cuenta,nombre_invocador,id_comprador,id_vendedor,precio,activo} = req.body
    const nuevacuenta = new Cuentas({titulo,servidor,campeones,aspectos,rango_temporada_pasada,email_verificado,nivel_cuenta,rango_temporada_actual,riot_points,esencia_azul,contraseña_cuenta,correo_cuenta,nombre_invocador,id_comprador,id_vendedor,precio,activo})
    console.log(nuevacuenta)
    const comprobarcorreo = await Cuentas.findOne({correo_cuenta: correo_cuenta})
    if(!comprobarcorreo){
        await nuevacuenta.save()
        return res.send(nuevacuenta)
    }else{
        return res.status(404).send('Ya existe una cuenta con ese email')
    }
   
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export const updateCuenta = async (req, res) => {
    try {
        const actualizarcuenta = await Cuentas.findByIdAndUpdate(req.params.id, req.body, {new: true})
    console.log(actualizarcuenta)
    return res.send(actualizarcuenta)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteCuenta = async (req, res) => {
    try {
        const eliminarcuenta = await Cuentas.findByIdAndDelete(req.params.id)

    if(!eliminarcuenta) return res.sendStatus(404)

    return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}