const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class PendaftaranMatkulKnvrs extends Model {}

PendaftaranMatkulKnvrs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pendaftaran_mbkm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pendaftaran_mbkm',
        key: 'id_pendaftaran_mbkm',
      },
    },
    id_matkul_knvrs: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'matkul_knvrs',
        key: 'id_matkul_knvrs',
      },
    },
  },
  {
    sequelize,
    modelName: 'PendaftaranMatkulKnvrs',
    tableName: 'pendaftaran_matkul_knvrs',
    timestamps: false,
  }
);

module.exports = PendaftaranMatkulKnvrs;
