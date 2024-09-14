const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

class User extends Model {
    // Add password validation method
    async isPasswordValid(password) {
      return await bcrypt.compare(password, this.password); // Compare hashed password
    }
  }
  
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('koor_mbkm', 'admin_siap', 'dosbing', 'mahasiswa'),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

// Hook untuk meng-hash password sebelum disimpan
User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10); // Hash the password
  });

module.exports = User;
