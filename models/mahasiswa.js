// mahasiswa.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Mahasiswa extends Model {}

Mahasiswa.init({
  NIM: {
    type: DataTypes.BIGINT,
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
    allowNull: true,
    references: {
      model: 'program_mbkm',
      key: 'id_program_mbkm'
    }
  },
  NIP_dosbing: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'dosbing',
      key: 'NIP_dosbing'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'user',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Mahasiswa',
  tableName: 'mahasiswa',
  timestamps: false
});

module.exports = Mahasiswa;
