const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categories = require('./categories');

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

// Add association here
ProgramMbkm.belongsTo(Categories, { foreignKey: 'category_id' });

module.exports = ProgramMbkm;
