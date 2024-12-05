const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const BerkasPenilaian = require('./berkasPenilaian');  // FK ke tabel berkas_penilaian
const Mahasiswa = require('./mahasiswa');

const KonversiNilai = sequelize.define('KonversiNilai', {
  id_konversi_nilai: {
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
  id_berkas_penilaian: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: BerkasPenilaian,
      key: 'id_berkas_penilaian'
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
