module.exports = (sequelize, DataTypes) => {
  const PendaftaranMbkm = sequelize.define('PendaftaranMbkm', {
    id_pendaftaran_mbkm: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    NIM: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Mahasiswa',  // Nama tabel Mahasiswa di database
        key: 'NIM'           // Foreign key untuk NIM
      }
    },
    NIP_dosbing: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Dosbing',  // Nama tabel Dosbing di database
        key: 'NIP_dosbing' // Foreign key untuk NIP_dosbing
      }
    },
    nama_berkas: {
      type: DataTypes.STRING,
      allowNull: true, 
      references: {
        model: 'BerkasPenilaian',  // Nama tabel BerkasPenilaian di database
        key: 'nama_berkas'        // Foreign key untuk nama_berkas
      }
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'pendaftaran_mbkm',
    timestamps: false
  });

  // Mendefinisikan relasi antara PendaftaranMbkm, Mahasiswa, Dosbing, dan BerkasPenilaian
  PendaftaranMbkm.associate = (models) => {
    PendaftaranMbkm.belongsTo(models.Mahasiswa, { foreignKey: 'NIM' });
    PendaftaranMbkm.belongsTo(models.Dosbing, { foreignKey: 'NIP_dosbing' });
    PendaftaranMbkm.belongsTo(models.BerkasPenilaian, { foreignKey: 'nama_berkas', targetKey: 'nama_berkas' });
  };

  return PendaftaranMbkm;
};
