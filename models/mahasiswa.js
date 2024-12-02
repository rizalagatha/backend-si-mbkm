const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Mahasiswa extends Model {}

Mahasiswa.init({
  NIM: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nama_mahasiswa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_program_mbkm: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'ProgramMbkm',
      key: 'id_program_mbkm',
    },
  },
  NIP_dosbing: {
    type: DataTypes.BIGINT,  // Asumsikan NIP_dosbing adalah STRING
    allowNull: true,
    references: {
      model: 'Dosbing',
      key: 'NIP_dosbing',  // Asumsikan kolom NIP di tabel dosbing adalah 'NIP'
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'User',
      key: 'id',  // Asumsikan kolom ID di tabel Users adalah 'id'
    },
  }
}, {
  sequelize,
  modelName: 'Mahasiswa',
  tableName: 'mahasiswa',
  timestamps: false,
});

// Define association
Mahasiswa.associate = () => {
  const ProgramMbkm = require('./programMbkm'); // Lazy loading
  const Dosbing = require('./dosbing');  // Lazy loading
  const Users = require('./users');  // Lazy loading

  Mahasiswa.belongsTo(ProgramMbkm, { foreignKey: 'id_program_mbkm', as: 'programMbkm' });
  Mahasiswa.belongsTo(Dosbing, { foreignKey: 'NIP_dosbing', as: 'dosbing' });
  Mahasiswa.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
};

module.exports = Mahasiswa;
