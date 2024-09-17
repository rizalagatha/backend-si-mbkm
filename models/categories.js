const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ProgramMbkm = require('./programMbkm');

const Categories = sequelize.define('Categories', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    tableName: 'categories',
    timestamps: false,
});

module.exports = Categories;
