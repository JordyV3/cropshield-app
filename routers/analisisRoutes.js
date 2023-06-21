import express from "express";
import { body } from 'express-validator';
import { admin, crear, guardar, agregarImagen, almacenarImagen, editar, guardarCambios, eliminar, cambiarEstado, mostrarAnalisis, enviarMensaje, verMensajes } from '../controllers/analisisController.js'
// import { admin, crear, guardar, editar, guardarCambios, eliminar, cambiarEstado, mostrarAnalisis, enviarMensaje, verMensajes } from '../controllers/analisisController.js'

import protegerRuta from "../middleware/protegerRuta.js"
import upload from '../middleware/subirImagen.js'
import identificarUsuario from "../middleware/identificarUsuario.js"

const router = express.Router()

router.get('/mis-analisis', protegerRuta, admin);
router.get('/analisis/crear', protegerRuta, crear);
router.post('/analisis/crear', protegerRuta,
    body('titulo').notEmpty().withMessage('El Titulo del Analisis es Obligatorio'),
    body('descripcion').notEmpty().withMessage('La Descripción no puede ir vacia').isLength({ max: 200 }).withMessage('La Descripción es muy larga'),
    body('categoria').notEmpty().withMessage('Selecciona una categoría'),
    body('cultivo').notEmpty().withMessage('Selecciona un cultivo'),
    body('area').notEmpty().withMessage('El area analizada es necesaria'),
    body('observaciones').notEmpty().withMessage('Las observaciones son necesarias'),
    body('temperatura').notEmpty().withMessage('Ingrese la temperatura del clima'),
    body('edad').notEmpty().withMessage('La edad no puede ir vacia'),
    body('lat').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
    // body('img-uploader').notEmpty().withMessage('Sube una imagen'),
    guardar

);

router.get('/analisis/agregar-imagen/:id',
    protegerRuta,
    agregarImagen
);

router.post('/analisis/agregar-imagen/:id',
    protegerRuta,
    upload.single('imagen'),
    almacenarImagen
)

router.get('/analisis/editar/:id',
    protegerRuta,
    editar
)

router.post('/analisis/editar/:id',
    protegerRuta,
    body('titulo').notEmpty().withMessage('El Titulo del Analisis es Obligatorio'),
    body('descripcion').notEmpty().withMessage('La Descripción no puede ir vacia').isLength({ max: 200 }).withMessage('La Descripción es muy larga'),
    body('categoria').notEmpty().withMessage('Selecciona una categoría'),
    body('cultivo').notEmpty().withMessage('Selecciona un cultivo'),
    body('area').notEmpty().withMessage('El area analizada es necesaria'),
    body('observaciones').notEmpty().withMessage('Las observaciones son necesarias'),
    body('clima').notEmpty().withMessage('Ingresa el clima'),
    body('edad').notEmpty().withMessage('La edad no puede ir vacia'),
    body('lat').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
    guardarCambios
)

router.post('/analisis/eliminar/:id',
    protegerRuta,
    eliminar
);

router.put('/analisis/:id',
    protegerRuta,
    cambiarEstado
);

router.get('/analisis/:id',
    identificarUsuario,
    mostrarAnalisis
);

router.post('/analisis/:id',
    identificarUsuario,
    body('mensaje').isLength({min: 20}).withMessage('El Mensaje no puede ir vacio o es muy corto'),
    enviarMensaje
);

router.get('/mensajes/:id',
    protegerRuta,
    verMensajes
)

export default router;