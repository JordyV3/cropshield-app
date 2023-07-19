import express from 'express'
import { inicio, categoria, noEncontrado, buscador, controlPlagas, tiempoReal} from '../controllers/appController.js'

const router = express.Router()

router.get('/', inicio)

router.get('/categorias/:id', categoria)

router.get('/404', noEncontrado)

router.post('/buscador', buscador)

router.get('/control-plagas', controlPlagas);

router.get('/analisis-tiempo-real', tiempoReal);


export default router;