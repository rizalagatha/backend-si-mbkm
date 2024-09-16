// models/category.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
    timestamps: false, // If you don't need createdAt and updatedAt fields
});

module.exports = Category;
