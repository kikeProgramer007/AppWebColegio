import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

 const Aviso = sequelize.define('aviso', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
},
{
  tableName: 'avisos',  
  timestamps: false
});

export default Aviso;
