const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class MatkulKnvrs extends Model {}

MatkulKnvrs.init(
  {
    id_matkul_knvrs: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_matkul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kode_matkul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jenis_matkul: {
      type: DataTypes.ENUM('pilihan_ganjil', 'pilihan_genap', 'wajib'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'MatkulKnvrs',
    tableName: 'matkul_knvrs',
    timestamps: false,
  }
);

// Asosiasi setelah semua model dimuat
MatkulKnvrs.associate = (models) => {
  // Pastikan model PendaftaranMbkm sudah dimuat dengan benar
  const PendaftaranMbkm = models.PendaftaranMbkm;
  const PendaftaranMatkulKnvrs = models.PendaftaranMatkulKnvrs;

  MatkulKnvrs.belongsToMany(PendaftaranMbkm, {
    through: PendaftaranMatkulKnvrs,
    foreignKey: 'id_matkul_knvrs',
    as: 'matkulPendaftaranMbkm',  // Alias yang unik
  });
};

module.exports = MatkulKnvrs;
