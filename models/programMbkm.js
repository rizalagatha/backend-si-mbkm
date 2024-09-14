const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
  category: {
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
  }
}, {
  tableName: 'program_mbkm',
  timestamps: false
});

module.exports = ProgramMbkm;
