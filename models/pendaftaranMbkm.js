const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Mahasiswa = require('./mahasiswa');  // FK ke tabel mahasiswa
const Dosbing = require('./dosbing');      // FK ke tabel dosbing
const BerkasPenilaian = require('./berkasPenilaian');

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
  nama_berkas: {
    type: DataTypes.STRING,
    allowNull: true, 
    references: {
      model: BerkasPenilaian, 
      key: 'nama_berkas'
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
