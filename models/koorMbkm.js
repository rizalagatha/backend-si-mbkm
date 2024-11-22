const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');  // Mengacu pada model User

const KoorMbkm = sequelize.define('KoorMbkm', {
  NIP_koor_mbkm: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  nama_koor_mbkm: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,  // Foreign key untuk relasi ke User
    allowNull: false,
    references: {
      model: User,
      key: 'id'  // id dari tabel User
    }
  }
}, {
  tableName: 'koor_mbkm',
  timestamps: false
});

// Menambahkan relasi antara KoorMbkm dan User
KoorMbkm.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = KoorMbkm;
