const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Mahasiswa = require('./mahasiswa');  // FK ke tabel mahasiswa
const Dosbing = require('./dosbing');      // FK ke tabel dosbing
const KoorMbkm = require('./koorMbkm');    // FK ke tabel koor_mbkm

const PendaftaranMbkm = sequelize.define('PendaftaranMbkm', {
  id_pendaftaran_mbkm: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NIM: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Mahasiswa,
      key: 'NIM'
    }
  },
  NIP_dosbing: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Dosbing,
      key: 'NIP_dosbing'
    }
  },
  NIP_koor_mbkm: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: KoorMbkm,
      key: 'NIP_koor_mbkm'
    }
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'pendaftaran_mbkm',
  timestamps: false
});

module.exports = PendaftaranMbkm;
