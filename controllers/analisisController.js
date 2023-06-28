import { unlink } from 'node:fs/promises';
import { validationResult } from 'express-validator'
import { Cultivo, Categoria, Usuario, Analisis, Mensaje } from '../models/index.js'
import { esAgricultor, formatearFecha } from '../helpers/index.js'

const admin = async (req, res) => {
    const { pagina: paginaActual } = req.query

    const expresion = /^[1-9]$/

    if (!expresion.test(paginaActual)) {
        return res.redirect('/mis-analisis?pagina=1')
    }

    try {
        const { id } = req.usuario
        const limit = 10
        const offset = ((paginaActual * limit) - limit)

        const [analisis, total] = await Promise.all([
            Analisis.findAll({
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

        // analisis,
        // pagina: analisis.titulo,
        // csrfToken: req.csrfToken(),
        // usuario: req.usuario,
        // formatearFecha,
        // esVendedor: esAgricultor(req.usuario?.id, analisis.usuarioId)

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

const crear = async (req, res) => {
    const [categorias, cultivos] = await Promise.all([
        Categoria.findAll(),
        Cultivo.findAll()
    ])

    res.render('analisis/crear', {
        pagina: 'Crear Propiedad',
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

    const { titulo, descripcion, area, observaciones, temperatura, altura, edad, calle, lat, lng, confianza, prediccion, categoria: categoriaId, cultivo: cultivoId } = req.body
    
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
            imagen:'',
            publicado: 1
        });
        console.log(analisisGuardado);
        res.redirect('/mis-analisis/')

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
            pagina: 'Editar Propiedad',
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

    // Revisar que quien visita la URl, es quien creo la propiedad
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

    await unlink(`public/uploads/${analisis.imagen}`)
    console.log(`Se eliminó la imagen ${analisis.imagen}`)

    await propiedad.destroy()
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
            propiedad,
            pagina: analisis.titulo,
            csrfToken: req.csrfToken(),
            usuario: req.usuario,
            esVendedor: esAgricultor(req.usuario?.id, analisis.usuarioId),
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
        formatearFecha
    })
}

export {
    admin,
    crear,
    guardar,
    // agregarImagen,
    // almacenarImagen,
    editar,
    guardarCambios,
    eliminar,
    cambiarEstado,
    mostrarAnalisis,
    enviarMensaje,
    verMensajes
}