import { Router } from "express";
import { createCoaching, deleteCoaching, getCoaching, getCoachings, updateCoaching } from "../controllers/coachings.controllers.js";
import { createCuenta, deleteCuenta,  getCuenta, getCuentas, updateCuenta } from "../controllers/cuentas.controllers.js";
import { createEloboost, deleteEloboost, getEloboost, getEloboosts, updateEloboost } from "../controllers/eloboosts.controller.js";
import { createMaestria, deleteMaestria, getMaestria, getMaestrias, updateMaestria } from "../controllers/maestrias.controllers.js";
import { getpedido, getPedidos, updatePedido, deletePedido, createPedido } from "../controllers/pedidos.controllers.js";
import { createProducto, deleteProducto, getProducto, getProductos, updateProducto } from "../controllers/productos.controller.js";
import { createUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario, getmiperfil, login } from "../controllers/usuarios.controllers.js";
import verificartoken from "../controllers/verificarToken.js";
const router = Router()

router.get('/cuentas', verificartoken, getCuentas)
router.get('/cuentas/:id', verificartoken, getCuenta)
router.post('/cuentas', verificartoken, createCuenta)
router.put('/cuentas/:id', verificartoken, updateCuenta)
router.delete('/cuentas/:id',verificartoken,  deleteCuenta)

router.get('/maestrias', verificartoken, getMaestrias)
router.get('/maestrias/:id', verificartoken, getMaestria)
router.post('/maestrias/', verificartoken, createMaestria)
router.put('/maestrias/:id', verificartoken, updateMaestria)
router.delete('/maestrias/:id', verificartoken, deleteMaestria)

router.get('/coachings', verificartoken, getCoachings)
router.get('/coachings/:id', verificartoken, getCoaching)
router.post('/coachings/', verificartoken, createCoaching)
router.put('/coachings/:id', verificartoken, updateCoaching)
router.delete('/coachings/:id', verificartoken, deleteCoaching)

router.get('/eloboosts', verificartoken, getEloboosts)
router.get('/eloboosts/:id', verificartoken, getEloboost)
router.post('/eloboosts/', verificartoken, createEloboost)
router.put('/eloboosts/:id', verificartoken, updateEloboost)
router.delete('/eloboosts/:id', verificartoken, deleteEloboost)

router.get('/productos', verificartoken, getProductos)
router.get('/productos/:id', verificartoken, getProducto)
router.post('/productos/', verificartoken, createProducto)
router.put('/productos/:id', verificartoken, updateProducto)
router.delete('/productos/:id', verificartoken, deleteProducto)

router.get('/usuarios', verificartoken, getUsuarios)
router.get('/usuarios/:id', verificartoken, getUsuario)
router.post('/usuarios/', createUsuario)
router.put('/usuarios/:id', verificartoken, updateUsuario)
router.delete('/usuarios/:id', verificartoken, deleteUsuario)
router.get('/mi-perfil', verificartoken, getmiperfil)
router.post('/login', verificartoken, login)

router.get('/pedidos', verificartoken, getPedidos)
router.get('/pedidos/:id', verificartoken, getpedido)
router.post('/pedidos/', verificartoken, createPedido)
router.put('/pedidos/:id', verificartoken, updatePedido)
router.delete('/pedidos/:id', verificartoken, deletePedido)

export default router