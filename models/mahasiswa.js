const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ProgramMbkm = require('./programMbkm');  // FK ke tabel program_mbkm
const Dosbing = require('./dosbing');          // FK ke tabel dosbing
const Categories = require('./categories');

const Mahasiswa = sequelize.define('Mahasiswa', {
  NIM: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nama_mahasiswa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_program_mbkm: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProgramMbkm,
      key: 'id_program_mbkm'
    }
  },
  NIP_dosbing: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Dosbing,
      key: 'NIP_dosbing'
    }
  },
  perusahaan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Categories,
      key: 'id'
    }
  }
}, {
  tableName: 'mahasiswa',
  timestamps: false
});

module.exports = Mahasiswa;
