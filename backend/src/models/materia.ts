import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Curso } from './curso';

export const Materia = sequelize.define('materia', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: { 
        type: DataTypes.STRING(50),
        allowNull: false
    },
    docente:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    id_curso: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'cursos',
            key: 'id'
        },
        onDelete: 'SET NULL'
    }
},
{ 
    tableName: 'materias',     
    timestamps: false 
});

// Asociación
Curso.hasMany(Materia, { foreignKey: 'id_curso' });
Materia.belongsTo(Curso, { foreignKey: 'id_curso' });

export default Materia;