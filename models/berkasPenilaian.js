const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const PendaftaranMbkm = require('./pendaftaranMbkm');  // FK ke tabel pendaftaran_mbkm
const KonversiNilai = require('./konversiNilai');      // FK ke tabel konversi_nilai

const BerkasPenilaian = sequelize.define('BerkasPenilaian', {
  id_berkas_penilaian: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_pendaftaran_mbkm: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: PendaftaranMbkm,
      key: 'id_pendaftaran_mbkm'
    }
  },
  id_konversi_nilai: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: KonversiNilai,
      key: 'id_konversi_nilai'
    }
  },
  nama_berkas: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'berkas_penilaian',
  timestamps: false
});

module.exports = BerkasPenilaian;
