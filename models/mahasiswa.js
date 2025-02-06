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
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'Dosbing',
      key: 'NIP_dosbing',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  id_matkul_knvrs: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'MatkulKnvrs',
      key: 'id_matkul_knvrs',
    },
  },
}, {
  sequelize,
  modelName: 'Mahasiswa',
  tableName: 'mahasiswa',
  timestamps: false,
});

// Define association
Mahasiswa.associate = () => {
  const ProgramMbkm = require('./programMbkm');
  const Dosbing = require('./dosbing');
  const User = require('./user');
  const MatkulKnvrs = require('./matkulKnvrs');

  Mahasiswa.belongsTo(ProgramMbkm, { foreignKey: 'id_program_mbkm', as: 'programMbkm' });
  Mahasiswa.belongsTo(Dosbing, { foreignKey: 'NIP_dosbing', as: 'dosbing' });
  Mahasiswa.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  Mahasiswa.belongsTo(MatkulKnvrs, { foreignKey: 'id_matkul_knvrs', as: 'matkulKnvrs' });
};

module.exports = Mahasiswa;
