const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categories = require('./categories');

// Define ProgramMbkm first
const ProgramMbkm = sequelize.define('ProgramMbkm', {
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
      model: 'Categories', // Refers to Categories table
      key: 'id',
    },
  },
}, {
  tableName: 'program_mbkm',
  timestamps: false
});

// Import Mahasiswa inside the file to prevent circular dependency
const Mahasiswa = require('./mahasiswa'); // Import after ProgramMbkm is defined

// Add association
ProgramMbkm.hasMany(Mahasiswa, { foreignKey: 'id_program_mbkm', as: 'mahasiswa' });

module.exports = ProgramMbkm;
