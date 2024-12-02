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
}, {
  sequelize,
  modelName: 'Mahasiswa',
  tableName: 'mahasiswa',
  timestamps: false,
});

// Define association
Mahasiswa.associate = () => {
  const ProgramMbkm = require('./programMbkm'); // Lazy loading

  Mahasiswa.belongsTo(ProgramMbkm, { foreignKey: 'id_program_mbkm', as: 'programMbkm' });
};

module.exports = Mahasiswa;
