// ----------------------------------
// /models/EstudianteMateria.ts
// ----------------------------------
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import {Estudiante} from './estudiante';
import {Materia} from './materia';

export const EstudianteMateria = sequelize.define('estudiante_materia', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
    },
    id_estudiante: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'estudiantes',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    id_materia: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'materias',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    nota_primer_bimestre: { 
        type: DataTypes.FLOAT,
        allowNull: false
    },
    nota_segundo_bimestre: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    nota_tercer_bimestre: { 
        type: DataTypes.FLOAT,
        allowNull: false
    },
    nota_cuarto_bimestre: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    promedio_anual: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
},
{ 
    tableName: 'estudiante_materia',     
    timestamps: false 
});

// Asociación muchos a muchos
Estudiante.belongsToMany(Materia, { through: EstudianteMateria, foreignKey: 'id_estudiante' });
Materia.belongsToMany(Estudiante, { through: EstudianteMateria, foreignKey: 'id_materia' });

export default EstudianteMateria;
