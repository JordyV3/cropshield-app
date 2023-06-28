import express from 'express'
import { inicio, categoria, noEncontrado, buscador, verPerfil } from '../controllers/appController.js'

const router = express.Router()

router.get('/', inicio)

router.get('/categorias/:id', categoria)

router.get('/404', noEncontrado)

router.post('/buscador', buscador)

router.get('/mi-perfil', verPerfil);

export default router;