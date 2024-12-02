module.exports = (sequelize, DataTypes) => {
  const BerkasPenilaian = sequelize.define('BerkasPenilaian', {
    id_berkas_penilaian: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NIM: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'mahasiswa', // Nama tabel mahasiswa di database
        key: 'NIM',
      },
    },
    nama_berkas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jenis_berkas: {
      type: DataTypes.ENUM('CV', 'transkrip', 'KTP', 'sertifikat', 'dokumen_tambahan'),
      allowNull: false,
    },
  }, {
    tableName: 'berkas_penilaian',
    timestamps: false,
  });

  // Relasi
  BerkasPenilaian.associate = (models) => {
    BerkasPenilaian.belongsTo(models.Mahasiswa, { foreignKey: 'NIM', as: 'mahasiswa' });
  };

  return BerkasPenilaian;
};
