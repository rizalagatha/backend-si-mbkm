const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProgramMbkm = sequelize.define('ProgramMbkm', {
  id_program_mbkm: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama_program: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'program_mbkm',
  timestamps: false
});

module.exports = ProgramMbkm;
