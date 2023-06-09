import { Analisis, Cultivo, Categoria } from '../models/index.js'

const analisis = async (req, res) => {

    const analisis = await Analisis.findAll({
        include: [
            {model: Cultivo, as: 'cultivo'},
            {model: Categoria, as: 'categoria'},
        ]
    })


    res.json(analisis)
}

export {
    analisis
}