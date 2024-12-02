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
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories', // Ensure the table name is correct
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'ProgramMbkm',
  tableName: 'program_mbkm',
  timestamps: false
});

// Associations
ProgramMbkm.belongsTo(Categories, { foreignKey: 'category_id', as: 'category' });
ProgramMbkm.hasMany(Mahasiswa, { foreignKey: 'id_program_mbkm', as: 'mahasiswa' });

module.exports = ProgramMbkm;
