const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
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
      unique: true, // Ensure the email is unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('koor_mbkm', 'admin_siap', 'dosbing', 'mahasiswa'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      // Hook untuk meng-hash password sebelum disimpan
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10); // Hash the password
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10); // Re-hash password if it's updated
        }
      },
    },
  });

  // Defining associations (if applicable)
  User.associate = (models) => {
    // Example of associations if necessary (e.g., hasMany, belongsTo, etc.)
    // User.hasOne(models.Dosbing, { foreignKey: 'user_id' });
    // User.hasOne(models.Mahasiswa, { foreignKey: 'user_id' });
    // User.hasOne(models.KoorMbkm, { foreignKey: 'user_id' });
    // User.hasOne(models.AdminSiap, { foreignKey: 'user_id' });
  };

  return User;
};
