const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Riwayat extends Model {}

Riwayat.init(
  {
    id_riwayat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NIM: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'mahasiswa', // Nama tabel atau model
        key: 'NIM',
      },
    },
    nilai: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama_berkas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_program_mbkm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'program_mbkm', // Nama tabel atau model
        key: 'id_program_mbkm',
      },
    },
  },
  {
    sequelize,
    modelName: 'Riwayat',
    tableName: 'riwayat',
    timestamps: false,
  }
);

// Define associations
Riwayat.associate = () => {
  const Mahasiswa = require('./mahasiswa'); // Lazy loading
  const ProgramMbkm = require('./programMbkm'); // Lazy loading

  Riwayat.belongsTo(Mahasiswa, { foreignKey: 'NIM', as: 'mahasiswa' });
  Riwayat.belongsTo(ProgramMbkm, { foreignKey: 'id_program_mbkm', as: 'program_mbkm' });
};

module.exports = Riwayat;
