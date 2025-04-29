import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import {Estudiante} from './estudiante';
import {Licencia} from './licencia';

export const Asistencia = sequelize.define('asistencia', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false 
    },
    estado: { 
        type: DataTypes.STRING(20),
        allowNull: false 
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    id_estudiante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
            model: 'estudiantes',
            key: 'id'
        }
    },
    id_licencia: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        references: {
            model: 'licencias', 
            key: 'id' 
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    }
},
{ 
    tableName: 'asistencias',  
    timestamps: false 
});

// Asociaciones
Estudiante.hasMany(Asistencia, { foreignKey: 'id_estudiante' });
Asistencia.belongsTo(Estudiante, { foreignKey: 'id_estudiante' });

Licencia.hasOne(Asistencia, { foreignKey: 'id_licencia' });
Asistencia.belongsTo(Licencia, { foreignKey: 'id_licencia' });

export default Asistencia;