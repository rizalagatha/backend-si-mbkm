const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ProgramMbkm = require('./programMbkm');  // FK ke tabel program_mbkm
const Dosbing = require('./dosbing');          // FK ke tabel dosbing
const User = require('./user');                // FK ke tabel User

const Mahasiswa = sequelize.define('Mahasiswa', {
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
      model: ProgramMbkm,
      key: 'id_program_mbkm'
    }
  },
  NIP_dosbing: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: Dosbing,
      key: 'NIP_dosbing'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,  // Foreign key untuk relasi ke User
    allowNull: true,
    references: {
      model: User,
      key: 'id'  // id dari tabel User
    }
  }
}, {
  tableName: 'mahasiswa',
  timestamps: false
});

// Menambahkan relasi antara Mahasiswa dan User
Mahasiswa.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Mahasiswa.hasMany(ProgramMbkm, { foreignKey: 'NIM', as: 'programMbkm' }); 

module.exports = Mahasiswa;
