const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Dosbing = sequelize.define('Dosbing', {
  NIP_dosbing: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  nama_dosbing: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'dosbing',
  timestamps: false
});

module.exports = Dosbing;
