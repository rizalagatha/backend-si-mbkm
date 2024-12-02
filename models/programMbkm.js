// programMbkm.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Categories = require('./categories');
const Mahasiswa = require('./mahasiswa'); // Import the Mahasiswa model correctly

class ProgramMbkm extends Model {}

ProgramMbkm.init({
  id_program_mbkm: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  waktu_pelaksanaan: {
    type: DataTypes.DATE,
    allowNull: true
  },
  category_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'ProgramMbkm',
  tableName: 'program_mbkm',
  timestamps: false
});

// Now, define the association correctly
ProgramMbkm.hasMany(Mahasiswa, { foreignKey: 'id_program_mbkm', as: 'mahasiswa' });

module.exports = ProgramMbkm;
