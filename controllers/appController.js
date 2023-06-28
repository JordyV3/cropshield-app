import { Sequelize } from 'sequelize'
import { Cultivo, Categoria, Analisis } from '../models/index.js'

const inicio = async (req, res) => {

    const [ categorias, cultivos, chile, departamentos ] = await Promise.all([
        Categoria.findAll({raw: true}),
        Cultivo.findAll({raw: true}),
        Analisis.findAll({
            limit: 3,
            where: {
                categoriaId: 1
            },
            include: [
                {
                    model: Cultivo,
                    as: 'cultivo'
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        }),
        Analisis.findAll({
            limit: 3,
            where: {
                categoriaId: 2
            },
            include: [
                {
                    model: Cultivo,
                    as: 'cultivo'
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
    ])


    res.render('inicio', {
        pagina: 'Inicio',
        categorias,
        cultivos,
        chile,
        // departamentos,
        csrfToken: req.csrfToken()
    })
}

const categoria = async (req, res) => {
    const { id } = req.params

    const categoria = await Categoria.findByPk(id)
    if(!categoria) {
        return res.redirect('/404')
    }

    const analisis = await Analysis.findAll({
        where: {
            categoriaId: id
        },
        include: [
            { model: Cultivo, as: 'cultivo'}
        ]
    })

    res.render('categoria', {
        pagina: `${categoria.nombre}s en Venta`,
        analisis,
        csrfToken: req.csrfToken()
    })

}

const noEncontrado = (req, res) => {
    res.render('404', {
        pagina: 'No Encontrada',
        csrfToken: req.csrfToken()
    })
}

const verPerfil = (req, res) => {
    res.render('mi-perfil', {
        pagina: 'Mi perfil',
        csrfToken : req.csrfToken()
    })
}

const buscador = async (req, res) => {
    const { termino } = req.body

    if(!termino.trim()) {
        return res.redirect('back')
    }

    const analisis = await Analysis.findAll({
        where: {
            titulo: {
                [Sequelize.Op.like] : '%' + termino + '%'
            }
        },
        include: [
            { model: Cultivo, as: 'cultivo'}
        ]
    })

    res.render('busqueda', {
        pagina: 'Resultados de la Búsqueda',
        analisis,
        csrfToken: req.csrfToken()
    })

}


export {
    inicio,
    categoria,
    noEncontrado,
    buscador,
    verPerfil
}