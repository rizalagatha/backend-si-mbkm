const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');  // Mengacu pada model User

const AdminSiap = sequelize.define('AdminSiap', {
  NIP_admin_siap: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  nama_admin_siap: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,  // Foreign key untuk relasi ke User
    allowNull: true,
    references: {
      model: User,
      key: 'id'  // id dari tabel User
    }
  }
}, {
  tableName: 'admin_siap',
  timestamps: false
});

// Menambahkan relasi antara AdminSiap dan User
AdminSiap.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = AdminSiap;
