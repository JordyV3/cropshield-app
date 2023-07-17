import express from 'express'
import { inicio, categoria, noEncontrado, buscador, verPerfil, controlPlagas, tiempoReal, graficos} from '../controllers/appController.js'

const router = express.Router()

router.get('/', inicio)

router.get('/categorias/:id', categoria)

router.get('/404', noEncontrado)

router.post('/buscador', buscador)

router.get('/mi-perfil', verPerfil);

router.get('/control-plagas', controlPlagas);

router.get('/analisis-tiempo-real', tiempoReal);

router.get('/graficos', graficos)

export default router;