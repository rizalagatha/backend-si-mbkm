const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class PendaftaranMbkm extends Model {}

PendaftaranMbkm.init(
  {
    id_pendaftaran_mbkm: {
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
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
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
    NIP_dosbing: {
      type: DataTypes.STRING, // Tipe data harus sesuai dengan kolom di tabel dosbing
      allowNull: false,
      references: {
        model: 'dosbing', // Nama tabel atau model
        key: 'NIP_dosbing',
      },
    },
  },
  {
    sequelize,
    modelName: 'PendaftaranMbkm',
    tableName: 'pendaftaran_mbkm',
    timestamps: false,
  }
);

// Define associations
PendaftaranMbkm.associate = () => {
  const Mahasiswa = require('./mahasiswa'); // Lazy loading
  const ProgramMbkm = require('./programMbkm'); // Lazy loading
  const Dosbing = require('./dosbing'); // Lazy loading

  PendaftaranMbkm.belongsTo(Mahasiswa, { foreignKey: 'NIM', as: 'mahasiswa' });
  PendaftaranMbkm.belongsTo(ProgramMbkm, { foreignKey: 'id_program_mbkm', as: 'program_mbkm' });
  PendaftaranMbkm.belongsTo(Dosbing, { foreignKey: 'NIP_dosbing', as: 'dosbing' });
};

module.exports = PendaftaranMbkm;
