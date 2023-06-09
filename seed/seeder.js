import { exit } from 'node:process'
import categorias from './categorias.js'
import cultivos from "./cultivo.js";
import usuarios from "./usuarios.js";
import db from '../config/db.js';
import { Categoria, Cultivo, Usuario } from '../models/index.js';

const importarDatos = async () =>{
    try {

        await db.authenticate()
        await db.sync()

        await Promise.all([
            Categoria.bulkCreate(categorias),
            Cultivo.bulkCreate(cultivos),
            Usuario.bulkCreate(usuarios)
        ])

        console.log('Datos Importados Correctamente')
        exit()

    } catch (error) {
        console.log(error)
        exit(1)
    }
}

const eliminarDatos = async () => {
    try {
        await db.sync({force: true})
        console.log('Datos Eliminados Correctamente');
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === "-i") {
    importarDatos();
}

if(process.argv[2] === "-e") {
    eliminarDatos();
}

