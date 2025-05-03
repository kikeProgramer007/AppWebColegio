import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Estudiante = sequelize.define('estudiante', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    codigo_rude: { 
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    cedula_identidad: { 
        type: DataTypes.STRING(10),
        allowNull: false,
        unique:true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido_paterno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido_materno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: { 
        type: DataTypes.STRING(1),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
}, 
{
    tableName: 'estudiantes',     
    timestamps: false 
});
  