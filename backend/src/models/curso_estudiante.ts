import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import {Estudiante} from './estudiante';
import {Curso} from './curso';

export const CursoEstudiante = sequelize.define('curso_estudiante', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_curso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cursos',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    id_estudiante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estudiantes',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    gestion: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
},
{
    tableName: 'curso_estudiante',     
    timestamps: false
});

// Asociación muchos a muchos
Estudiante.belongsToMany(Curso, { through: CursoEstudiante, foreignKey: 'id_estudiante' });
Curso.belongsToMany(Estudiante, { through: CursoEstudiante, foreignKey: 'id_curso' });

export default CursoEstudiante;
