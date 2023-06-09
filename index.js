import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routers/usuarioRoutes.js';
import analisisRoutes from "./routers/analisisRoutes.js";
import db from './config/db.js'
import appRoutes from "./routers/appRoutes.js";
import apiRoutes from "./routers/apiRoutes.js";

const app = express();

app.use( express.urlencoded({extended: true}) )

app.use( cookieParser() )

app.use( csrf({cookie: true}) )

try {
    await db.authenticate();
    db.sync()
    console.log('Conexión Correcta a la Base de datos')
} catch (error) {
    console.log(error)
}

app.set('view engine', 'pug')
app.set('views', './views')

app.use( express.static('public') );

app.use('/', appRoutes);
app.use('/auth', usuarioRoutes);
app.use('/', analisisRoutes);
app.use('/api', apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
});