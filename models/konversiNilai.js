const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const BerkasPenilaian = require('./berkasPenilaian');  // FK ke tabel berkas_penilaian
const Mahasiswa = require('./mahasiswa');
const Dosbing = require('./dosbing');
const PendaftaranMatkulKnvrs = require('./pendaftaranmatkulknvrs'); // FK baru yang ditambahkan

const KonversiNilai = sequelize.define('KonversiNilai', {
  id_konversi_nilai: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_pendaftaran_matkul_knvrs: {  // FK baru
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PendaftaranMatkulKnvrs,
      key: 'id'
    },
    onDelete: 'CASCADE'
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
    allowNull: true, 
    references: {
      model: BerkasPenilaian, 
      key: 'nama_berkas'
    }
  },
  NIP_dosbing: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: Dosbing,
      key: 'NIP_dosbing'
    }
  },
  nilai_akhir: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'konversi_nilai',
  timestamps: false
});

// Definisi Relasi
PendaftaranMatkulKnvrs.hasMany(KonversiNilai, {
  foreignKey: 'id_pendaftaran_matkul_knvrs',
  onDelete: 'CASCADE',
});
KonversiNilai.belongsTo(PendaftaranMatkulKnvrs, {
  foreignKey: 'id_pendaftaran_matkul_knvrs',
});

module.exports = KonversiNilai;
