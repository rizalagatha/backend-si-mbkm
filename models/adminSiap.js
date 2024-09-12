const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AdminSiap = sequelize.define('AdminSiap', {
  NIP_admin_siap: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nama_admin_siap: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'admin_siap',
  timestamps: false
});

module.exports = AdminSiap;
