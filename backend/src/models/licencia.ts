import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import {Estudiante} from './estudiante.model';

export const Licencia = sequelize.define('licencia', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  asunto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  justificacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  activo: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1
  },
  id_estudiante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'estudiantes',
      key: 'id'
    }
  }
}, {
  tableName: 'licencias',     
  timestamps: false
});

// Asociación: un Estudiante puede tener muchas Licencias
Estudiante.hasMany(Licencia, { foreignKey: 'id_estudiante' });
Licencia.belongsTo(Estudiante, { foreignKey: 'id_estudiante' });

export default Licencia;
