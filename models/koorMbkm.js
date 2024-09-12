const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const KoorMbkm = sequelize.define('KoorMbkm', {
  NIP_koor_mbkm: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nama_koor_mbkm: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'koor_mbkm',
  timestamps: false
});

module.exports = KoorMbkm;
