const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const ProgramMbkm = require('./programMbkm');

class Categories extends Model {}

Categories.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Categories',
  tableName: 'categories',
  timestamps: false
});

// Associations
Categories.hasMany(ProgramMbkm, { foreignKey: 'category_id', as: 'programs' });

module.exports = Categories;
