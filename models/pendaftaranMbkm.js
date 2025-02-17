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
        model: 'mahasiswa',
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
        model: 'program_mbkm',
        key: 'id_program_mbkm',
      },
    },
    NIP_dosbing: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'dosbing',
        key: 'NIP_dosbing',
      },
    },
    id_matkul_knvrs: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'matkul_knvrs', // Tabel konversi_nilai
        key: 'id_matkul_knvrs',
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
  const Mahasiswa = require('./mahasiswa');
  const ProgramMbkm = require('./programMbkm');
  const Dosbing = require('./dosbing');
  const MatkulKnvrs = require('./matkulKnvrs'); // Lazy loading

  PendaftaranMbkm.belongsTo(Mahasiswa, { foreignKey: 'NIM', as: 'mahasiswa' });
  PendaftaranMbkm.belongsTo(ProgramMbkm, { foreignKey: 'id_program_mbkm', as: 'program_mbkm' });
  PendaftaranMbkm.belongsTo(Dosbing, { foreignKey: 'NIP_dosbing', as: 'dosbing' });
  PendaftaranMbkm.belongsTo(MatkulKnvrs, { foreignKey: 'id_matkul_knvrs', as: 'matkul_knvrs' });
};

module.exports = PendaftaranMbkm;
