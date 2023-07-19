import path from 'path'
import { Script } from 'vm'
export default {
    mode: 'development',
    entry: {
        mapa: './src/js/mapa.js',
        agregarImagen: './src/js/agregarImagen.js',
        mostrarMapa: './src/js/mostrarMapa.js',
        mapaInicio: './src/js/mapaInicio.js',
        cambiarEstado: './src/js/cambiarEstado.js',
        uploadFile: './src/js/uploadFile.js',
        scriptApp: './src/js/scriptApp.js',
        scriptAdmin: './src/js/scriptAdmin.js',
        modalScripts: './src/js/modalScripts.js',
        controlPlagas: './src/js/controlPlagas.js',
        tiempoReal: './src/js/tiempoReal.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}