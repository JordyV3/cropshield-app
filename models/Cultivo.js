import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Cultivo = db.define('cultivos', {
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});

export default Cultivo;