module.exports = (sequelize, DataTypes) => {
  const Pengumuman = sequelize.define('Pengumuman', {
    id_pengumuman: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isi: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false
    },
    NIP_koor_mbkm: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'KoorMbkm', // Nama tabel KoorMbkm di database
        key: 'NIP_koor_mbkm' // Foreign key ke NIP_koor_mbkm
      }
    }
  }, {
    tableName: 'pengumuman',
    timestamps: false
  });

  // Menambahkan relasi antara Pengumuman dan KoorMbkm
  Pengumuman.associate = (models) => {
    Pengumuman.belongsTo(models.KoorMbkm, { foreignKey: 'NIP_koor_mbkm' });
  };

  return Pengumuman;
};
