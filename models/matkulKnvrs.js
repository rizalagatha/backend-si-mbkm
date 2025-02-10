const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MatkulKnvrs = sequelize.define('MatkulKnvrs', {
  id_matkul_knvrs: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama_matkul: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kode_matkul: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sks: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  jenis_matkul: {
    type: DataTypes.ENUM('pilihan_ganjil', 'pilihan_genap', 'wajib'),
    allowNull: false
  }
}, {
  tableName: 'matkul_knvrs',
  timestamps: false
});

module.exports = MatkulKnvrs;
