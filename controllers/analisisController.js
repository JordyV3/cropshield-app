import { unlink } from 'node:fs/promises';
import { validationResult } from 'express-validator'
import { Cultivo, Categoria, Usuario, Analisis, Mensaje} from '../models/index.js'
import { esAgricultor, formatearFecha } from '../helpers/index.js'
const admin = async (req, res) =>{
    const { pagina: paginaActual } = req.query

    const expresion = /^[1-9]$/

    if(!expresion.test(paginaActual)) {
        return res.redirect('/mis-analisis?pagina=1')
    }

    try {
        const {id} = req.usuario

        const limit = 10
        const offset = ((paginaActual * limit) - limit)

        const [analisis, total] = await Promise.all([
            Analisis.findAll({
                limit,
                offset,
                where: {
                    usuarioId : id
                },
                include: [
                    { model: Categoria, as: 'categoria' },
                    { model: Cultivo, as: 'cultivo' },
                    { model: Mensaje, as: 'mensajes' }
                ],
            }),
            Analisis.count({
                where: {
                    usuarioId : id
                }
            })
        ])

        res.render('analisis/admin', {
            pagina: 'Mis Analisis',
            analisis,
            csrfToken: req.csrfToken(),
            paginas: Math.ceil(total / limit),
            paginaActual: Number(paginaActual),
            formatearFecha,
            verMensajes,
            total,
            offset,
            limit
        })

    } catch (error) {
        console.log(error)
    }
}

const crear = async (req, res) => {

    const [categorias, cultivos] = await Promise.all([
        Categoria.findAll(),
        Cultivo.findAll()
    ]);

    res.render('analisis/crear', {
        pagina: 'Crear Analisis',
        csrfToken: req.csrfToken(),
        categorias,
        cultivos,
        datos: {}
    });
}

const guardar = async (req, res)=>{
    let resultado = validationResult(req);

    if(!resultado.isEmpty()) {

        const [categorias, cultivos] = await Promise.all([
            Categoria.findAll(),
            Cultivo.findAll()
        ]);

        return res.render('analisis/crear', {
            pagina: 'Crear Analisis',
            csrfToken: req.csrfToken(),
            categorias,
            cultivos,
            errores: resultado.array(),
            datos: req.body
        });
    }

    const { titulo, descripcion, areaAnalisis, observaciones, clima, edad, calle, lat, lng, cultivo: cultivoId, categoria: categoriaId } = req.body

    const { id: usuarioId } = req.usuario

    try {
        const analisisGuardado = await Analisis.create({
            titulo,
            descripcion,
            areaAnalisis,
            observaciones,
            clima,
            edad,
            calle,
            lat,
            lng,
            cultivoId,
            categoriaId,
            usuarioId,
            imagen: ''
        })

        const {id} = analisisGuardado;

        res.redirect(`/analisis/agregar-imagen/${id}`)

    } catch (error) {
        console.log(error)
    }
}

const agregarImagen = async (req, res) => {

    const {id} = req.params

    const analisis = await Analisis.findByPk(id)
    if(!analisis) {
        return res.redirect('/mis-analisis')
    }

    if(analisis.publicado) {
        return res.redirect('/mis-analisis')
    }

    if( req.usuario.id.toString() !== analisis.usuarioId.toString() ) {
        return res.redirect('/mis-analisis')
    }

    res.render('analisis/agregar-imagen', {
        pagina: `Agregar Imagen: ${analisis.titulo}`,
        csrfToken: req.csrfToken(),
        analisis
    });
}

const almacenarImagen = async (req, res, next) => {

    const {id} = req.params

    const analisis = await Analisis.findByPk(id)
    if(!analisis) {
        return res.redirect('/mis-analisis')
    }

    if(analisis.publicado) {
        return res.redirect('/mis-analisis')
    }

    if( req.usuario.id.toString() !== analisis.usuarioId.toString() ) {
        return res.redirect('/mis-analisis')
    }

    try {
        analisis.imagen = req.file.filename
        analisis.publicado = 1

        await analisis.save()

        next()

    } catch (error) {
        console.log(error)
    }
}

const editar = async (req, res) => {

    const {id} = req.params

    const analisis = await Analisis.findByPk(id)

    if(!analisis) {
        return res.redirect('/mis-analisis')
    }

    if(analisis.usuarioId.toString() !== req.usuario.id.toString() ) {
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

const guardarCambios = async (req, res ) => {

    let resultado = validationResult(req)

    if(!resultado.isEmpty()) {

        const [categorias, cultivos] = await Promise.all([
            Categoria.findAll(),
            Cultivo.findAll()
        ]);

        return res.render('analisis/editar', {
            pagina: 'Editar Analisis',
            csrfToken: req.csrfToken(),
            categorias,
            cultivos,
            errores: resultado.array(),
            datos: req.body
        });
    }

    const {id} = req.params

    const analisis = await Analisis.findByPk(id)

    if(!analisis) {
        return res.redirect('/mis-analisis')
    }

    if(analisis.usuarioId.toString() !== req.usuario.id.toString() ) {
        return res.redirect('/mis-analisis')
    }

    try {

        const { titulo, descripcion, areaAnalisis, observaciones, clima, edad, calle, lat, lng, cultivo: cultivoId, categoria: categoriaId } = req.body

        analisis.set({

            titulo,
            descripcion,
            areaAnalisis,
            observaciones,
            clima,
            edad,
            calle,
            lat,
            lng,
            cultivoId,
            categoriaId,

        });

        await analisis.save();

        res.redirect('/mis-analisis')

    } catch (error) {
        console.log(error)
    }

}

const eliminar = async (req, res) => {

    const {id} = req.params

    const analisis = await Analisis.findByPk(id)
    if(!analisis) {
        return res.redirect('/mis-analisis')
    }

    if(analisis.usuarioId.toString() !== req.usuario.id.toString() ) {
        return res.redirect('/mis-analisis')
    }

    await unlink(`public/uploads/${propiedad.imagen}`)
    console.log(`Se eliminó la imagen ${propiedad.imagen}`)

    await analisis.destroy()
    res.redirect('/mis-analisis')
}

const cambiarEstado = async (req, res) => {

    const {id} = req.params

    const analisis = await Analisis.findByPk(id)
    if(!analisis) {
        return res.redirect('/mis-analisis')
    }

    if(analisis.usuarioId.toString() !== req.usuario.id.toString() ) {
        return res.redirect('/mis-analisis')
    }

    analisis.publicado = !analisis.publicado

    await analisis.save()

    res.json({
        resultado: true
    })
}

const mostrarAnalisis = async (req, res) => {
    const {id} = req.params

    const analisis = await Analisis.findByPk(id, {
        include : [
            { model: Cultivo, as: 'cultivo' },
            { model: Categoria, as: 'categoria', scope: 'eliminarPassword' },
        ]
    })

    if(!analisis || !analisis.publicado) {
        return res.redirect('/404')
    }


    res.render('analisis/mostrar', {
        analisis,
        pagina: analisis.titulo,
        csrfToken: req.csrfToken(),
        usuario: req.usuario,
        esVendedor: esAgricultor(req.usuario?.id, analisis.usuarioId ),
        verMensajes,
        formatearFecha
    });
}


const enviarMensaje = async (req, res) => {
    const {id} = req.params

    const analisis = await Analisis.findByPk(id, {
        include : [
            { model: Cultivo, as: 'cultivo' },
            { model: Categoria, as: 'categoria' },
        ]
    })

    if(!analisis) {
        return res.redirect('/404')
    }

    let resultado = validationResult(req)

    if(!resultado.isEmpty()) {

        return res.render('analisis/mostrar', {
            analisis,
            pagina: analisis.titulo,
            csrfToken: req.csrfToken(),
            usuario: req.usuario,
            esVendedor: esAgricultor(req.usuario?.id, analisis.usuarioId ),
            errores: resultado.array()
        });
    }
    const { mensaje } = req.body
    const { id: analisisId } = req.params
    const { id: usuarioId } = req.usuario

    await Mensaje.create({
        mensaje,
        analisisId,
        usuarioId
    });

    res.redirect('/')

}
const verMensajes = async (req, res) => {

    const {id} = req.params

    const analisis = await Analisis.findByPk(id, {
        include: [
            { model: Mensaje, as: 'mensajes',
                include: [
                    {model: Usuario.scope('eliminarPassword'), as: 'usuario'}
                ]
            },
        ],
    })

    if(!analisis) {
        return res.redirect('/mis-analisis')
    }

    if(analisis.usuarioId.toString() !== req.usuario.id.toString() ) {
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
    agregarImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar,
    cambiarEstado,
    mostrarAnalisis,
    enviarMensaje,
    verMensajes
}