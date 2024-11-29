const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Mahasiswa = require('./mahasiswa');  // FK ke tabel pendaftaran_mbkm

const BerkasPenilaian = sequelize.define('BerkasPenilaian', {
  id_berkas_penilaian: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NIM: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: Mahasiswa,
      key: 'NIM'
    }
  },
  nama_berkas: {
    type: DataTypes.STRING,
    allowNull: true
  },
  jenis_berkas: { // ENUM untuk jenis dokumen
    type: DataTypes.ENUM('CV', 'transkrip', 'KTP', 'sertifikat', 'dokumen_tambahan'),
    allowNull: false,
  },
}, {
  tableName: 'berkas_penilaian',
  timestamps: false
});

module.exports = BerkasPenilaian;
