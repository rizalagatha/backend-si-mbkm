const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const KoorMbkm = require('./koorMbkm');  // FK ke tabel koor_mbkm

const Pengumuman = sequelize.define('Pengumuman', {
  id_pengumuman: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false
  },
  NIP_koor_mbkm: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: KoorMbkm,
      key: 'NIP_koor_mbkm'
    }
  }
}, {
  tableName: 'pengumuman',
  timestamps: false
});

module.exports = Pengumuman;
