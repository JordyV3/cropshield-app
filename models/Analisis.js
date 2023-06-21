import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Analisis = db.define('analisis', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    area: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    temperatura: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    altura: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calle: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lng: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prediccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confianza: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publicado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

export default Analisis;

