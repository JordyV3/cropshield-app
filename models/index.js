import Analisis from './Analisis.js';
import Cultivo from './Cultivo.js';
import Categoria from './Categoria.js';
import Usuario from "./Usuario.js";
import Mensaje from "./Mensajes.js";

Analisis.belongsTo(Cultivo, {foreignKey: 'cultivoId'});
Analisis.belongsTo(Categoria, {foreignKey: 'categoriaId'});
Analisis.belongsTo(Usuario, {foreignKey: 'usuarioId'});
Analisis.hasMany(Mensaje, { foreignKey: 'analisisdId'} )

Mensaje.belongsTo(Analisis, { foreignKey: 'analisisdId'})
Mensaje.belongsTo(Usuario, { foreignKey: 'usuarioId'})



export {
    Analisis,
    Cultivo,
    Categoria,
    Usuario,
    Mensaje,
}