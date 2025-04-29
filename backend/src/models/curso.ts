import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Curso = sequelize.define('curso', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false 
    },
    grado: { 
        type: DataTypes.STRING(20), 
        allowNull: false 
    },
    grupo: { 
        type: DataTypes.CHAR(1),
         allowNull: false 
    },
    nivel: {
         type: DataTypes.STRING(20), 
         allowNull: false 
    },
}, 
{ 
    tableName: 'cursos',     
    timestamps: false 
});