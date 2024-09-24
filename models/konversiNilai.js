const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const AdminSiap = require('./adminSiap');  // FK ke tabel admin_siap
const BerkasPenilaian = require('./berkasPenilaian');  // FK ke tabel berkas_penilaian

const KonversiNilai = sequelize.define('KonversiNilai', {
  id_konversi_nilai: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NIP_admin_siap: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: AdminSiap,
      key: 'NIP_admin_siap'
    }
  },
  id_berkas_penilaian: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: BerkasPenilaian,
      key: 'id_berkas_penilaian'
    }
  },
  nilai_akhir: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'konversi_nilai',
  timestamps: false
});

module.exports = KonversiNilai;
