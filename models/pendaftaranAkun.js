const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Mahasiswa = require('./mahasiswa');  // FK ke tabel mahasiswa
const KoorMbkm = require('./koorMbkm');    // FK ke tabel koor_mbkm

const PendaftaranAkun = sequelize.define('PendaftaranAkun', {
  id_pendaftaran_akun: {
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
  tableName: 'pendaftaran_akun',
  timestamps: false
});

module.exports = PendaftaranAkun;
