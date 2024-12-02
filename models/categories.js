const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

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

// Define association lazily
Categories.associate = () => {
  const ProgramMbkm = require('./programMbkm'); // Lazy loading
  Categories.hasMany(ProgramMbkm, { foreignKey: 'category_id', as: 'programs' });
};

module.exports = Categories;
