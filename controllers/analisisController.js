import { unlink } from 'node:fs/promises';
import { body, validationResult } from 'express-validator'
import { Cultivo, Categoria, Usuario, Analisis, Mensaje } from '../models/index.js'
import { esAgricultor, formatearFecha } from '../helpers/index.js'
import { analisis } from './apiController.js';
import path from 'node:path';
import { count } from 'node:console';

const admin = async (req, res) => {
    const { pagina: paginaActual } = req.query

    const expresion = /^[1-9]$/

    if (!expresion.test(paginaActual)) {
        return res.redirect('/mis-analisis?pagina=1')
    }

    try {
        const { id } = req.usuario
        const limit = 5
        const offset = ((paginaActual * limit) - limit)

        const [analisis, total] = await Promise.all([
            Analisis.findAll({
                order: [['createdAt', 'DESC']],
                limit,
                offset,
                where: {
                    usuarioId: id
                },
                include: [
                    { model: Categoria, as: 'categoria' },
                    { model: Cultivo, as: 'cultivo' },
                    { model: Mensaje, as: 'mensajes' }
                ],
            }),
            Analisis.count({
                where: {
                    usuarioId: id
                }
            })
        ])

        res.render('analisis/admin', {
            analisis,
            pagina: 'Mostrar Analisis',
            csrfToken: req.csrfToken(),
            usuario: req.usuario,
            formatearFecha,
            paginas: Math.ceil(total / limit),
            paginaActual: Number(paginaActual),
            total,
            offset,
            limit,
            esVendedor: esAgricultor(req.usuario?.id, analisis.usuarioId)
        })

    } catch (error) {
        console.log(error)
    }

}

const publico = async (req, res) => {
    const { pagina: paginaActual } = req.query
    
    const expresion = /^[1-9]$/

    if (!expresion.test(paginaActual)) {
        return res.redirect('/analisis?pagina=1')
    }

    try {
        const { id } = req.usuario
        const limit = 15
        const offset = ((paginaActual * limit) - limit)

        const [analisis, total] = await Promise.all([
            Analisis.findAll({
                order: [['createdAt', 'DESC']],
                limit,
                offset,
                where: {
                    usuarioId: id
                },
                include: [
                    { model: Categoria, as: 'categoria' },
                    { model: Cultivo, as: 'cultivo' },
                    { model: Usuario, as: 'usuario'}
                ],
            }),
        ])

        const [analisisCt,] = await Promise.all([
            Analisis.count({
                where: {
                    usuarioId: id
                },
            })
        ])

        const [analisisPrediccionSana] = await Promise.all([
            Analisis.count({ 
                where: {
                    prediccion: 'Planta Saludable',
                    usuarioId: id,
                }
            })
        ]);

        const [analisisPrediccionEnfermo] = await Promise.all([
            Analisis.count({ 
                where: {
                    prediccion: 'Planta Enferma Trips',
                    usuarioId: id,
                }
            })
        ]);

        const [promedioC] = await Promise.all([
            Analisis.aggregate('confianza', 'avg',{
                where: {
                    usuarioId: id
                }
            })
        ]);

        const [promedioRedondeado] = await Promise.all([
            promedioC.toFixed(2)
        ]);

        const [promedioSalu] = await Promise.all([ (analisisPrediccionSana / analisisCt) * 100 ])
        const [promedioSaluR] = await Promise.all([promedioSalu.toFixed(2)])

        const [promedioEnf] = await Promise.all([(analisisPrediccionEnfermo / analisisCt) * 100])
        const [promedioEnfR] = await Promise.all([promedioEnf.toFixed(2)])

        res.render('analisis/public', {
            analisis,
            analisisCt,
            analisisPrediccionSana,
            analisisPrediccionEnfermo,
            promedioRedondeado,
            promedioSaluR,
            promedioEnfR,
            usuario: req.usuario,
            pagina: 'Mostrar Analisis',
            csrfToken: req.csrfToken(),
            formatearFecha,
            paginas: Math.ceil(total / limit),
            paginaActual: Number(paginaActual),
            total,
            offset,
            limit,
            esVendedor: esAgricultor(req.usuario?.id, analisis.usuarioId)
        })

    } catch (error) {
        console.log(error)
    }
}

const graficos = (req, res) => {
    res.render('analisis/graficos', {
        pagina: 'Graficos',
        csrfToken: req.csrfToken(),
        usuario: req.usuario,
        formatearFecha,
        esVendedor: esAgricultor(req.usuario?.id)
    })
}

const miPerfil = async(req, res) =>{
    res.render('analisis/perfil', {
        pagina: 'Mi perfil',
        csrfToken: req.csrfToken(),
        usuario: req.usuario,
        formatearFecha,
        esVendedor: esAgricultor(req.usuario?.id)
    });
}

const crear = async (req, res) => {
    const [categorias, cultivos] = await Promise.all([
        Categoria.findAll(),
        Cultivo.findAll()
    ])

    res.render('analisis/crear', {
        pagina: 'Crear Analisis',
        csrfToken: req.csrfToken(),
        categorias,
        cultivos,
        datos: {}
    })
}

const guardar = async (req, res) => {

    let resultado = validationResult(req)

    if (!resultado.isEmpty()) {

        const [categorias, cultivos] = await Promise.all([
            Categoria.findAll(),
            Cultivo.findAll()
        ])

        return res.render('analisis/crear', {
            pagina: 'Crear Analisis',
            csrfToken: req.csrfToken(),
            categorias,
            cultivos,
            errores: resultado.array(),
            datos: req.body
        })
    }
    const { titulo, descripcion, area, observaciones, temperatura, altura, edad, calle, lat, lng, confianza, imagen, prediccion, categoria: categoriaId, cultivo: cultivoId } = req.body
    
    const { id: usuarioId } = req.usuario;
    try {
        const analisisGuardado = await Analisis.create({
            titulo,
            descripcion,
            area,
            observaciones,
            temperatura,
            altura,
            edad,
            calle,
            lat,
            lng,
            prediccion,
            confianza,
            categoriaId,
            cultivoId,
            usuarioId,
            imagen,
            publicado: 1
        });
        console.log(analisisGuardado);

        res.redirect('/mis-analisis')

    } catch (error) {
        console.log(error)
    }
}

const editar = async (req, res) => {

    const { id } = req.params

    const analisis = await Analisis.findByPk(id)

    if (!analisis) {
        return res.redirect('/mis-analisis')
    }

    if (analisis.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-analisis')
    }

    const [categorias, cultivos] = await Promise.all([
        Categoria.findAll(),
        Cultivo.findAll()
    ])

    res.render('analisis/editar', {
        pagina: `Editar Analisis: ${analisis.titulo}`,
        csrfToken: req.csrfToken(),
        categorias,
        cultivos,
        datos: analisis
    })
}

const guardarCambios = async (req, res) => {

    let resultado = validationResult(req)

    if (!resultado.isEmpty()) {

        const [categorias, cultivos] = await Promise.all([
            Categoria.findAll(),
            Cultivo.findAll()
        ])

        return res.render('analisis/editar', {
            pagina: 'Editar Analisis',
            csrfToken: req.csrfToken(),
            categorias,
            cultivos,
            errores: resultado.array(),
            datos: req.body
        })
    }

    const { id } = req.params

    const analisis = await Analisis.findByPk(id)

    if (!analisis) {
        return res.redirect('/mis-analisis')
    }

    if (analisis.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-analisis')
    }

    try {

        const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria: categoriaId } = req.body

        analisis.set({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId,
            categoriaId
        })

        await analisis.save();

        res.redirect('/mis-analisis')

    } catch (error) {
        console.log(error)
    }

}

const eliminar = async (req, res) => {

    const { id } = req.params

    const analisis = await Analisis.findByPk(id)
    if (!analisis) {
        return res.redirect('/mis-analisis')
    }

    if (analisis.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-analisis')
    }

    await unlink(`${analisis.imagen}`)
    console.log(`Se eliminó la imagen ${analisis.imagen}`)

    await analisis.destroy()
    res.redirect('/mis-analisis')
}

const cambiarEstado = async (req, res) => {

    const { id } = req.params

    const analisis = await Analisis.findByPk(id)
    if (!analisis) {
        return res.redirect('/mis-analisis')
    }

    if (analisis.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-analisis')
    }

    analisis.publicado = !analisis.publicado

    await analisis.save()

    res.json({
        resultado: true
    })
}

const mostrarAnalisis = async (req, res) => {
    const { id } = req.params

    const analisis = await Analisis.findByPk(id, {
        include: [
            { model: Cultivo, as: 'cultivo' },
            { model: Categoria, as: 'categoria', scope: 'eliminarPassword' },
        ]
    })

    if (!analisis || !analisis.publicado) {
        return res.redirect('/404')
    }

    res.render('analisis/mostrar', {
        analisis,
        pagina: analisis.titulo,
        csrfToken: req.csrfToken(),
        usuario: req.usuario,
        formatearFecha,
        esVendedor: esAgricultor(req.usuario?.id, analisis.usuarioId)
    })
}


const enviarMensaje = async (req, res) => {
    const { id } = req.params

    const analisis = await Analisis.findByPk(id, {
        include: [
            { model: Cultivo, as: 'cultivo' },
            { model: Categoria, as: 'categoria' },
        ]
    })

    if (!analisis) {
        return res.redirect('/404')
    }

    let resultado = validationResult(req)

    if (!resultado.isEmpty()) {

        return res.render('analisis/mostrar', {
            analisis,
            formatearFecha,
            pagina: analisis.titulo,
            csrfToken: req.csrfToken(),
            usuario: req.usuario,
            esAgricultor: esAgricultor(req.usuario?.id, analisis.usuarioId),
            errores: resultado.array()
        })
    }
    const { mensaje } = req.body
    const { id: analisisId } = req.params
    const { id: usuarioId } = req.usuario

    await Mensaje.create({
        mensaje,
        analisisId,
        usuarioId
    });

    res.redirect('/')

}
const verMensajes = async (req, res) => {

    const { id } = req.params

    const analisis = await Analisis.findByPk(id, {
        include: [
            {
                model: Mensaje, as: 'mensajes',
                include: [
                    { model: Usuario.scope('eliminarPassword'), as: 'usuario' }
                ]
            },
        ],
    })

    if (!analisis) {
        return res.redirect('/mis-analisis')
    }

    if (analisis.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-analisis')
    }

    res.render('analisis/mensajes', {
        pagina: 'Mensajes',
        mensajes: analisis.mensajes,
        formatearFecha,
    })
}

export {
    admin,
    crear,
    guardar,
    graficos,
    editar,
    guardarCambios,
    eliminar,
    cambiarEstado,
    mostrarAnalisis,
    enviarMensaje,
    verMensajes,
    publico,
    miPerfil,
}