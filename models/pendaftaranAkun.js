module.exports = (sequelize, DataTypes) => {
  const PendaftaranAkun = sequelize.define('PendaftaranAkun', {
    id_pendaftaran_akun: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    NIM: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Mahasiswa', // Nama tabel Mahasiswa di database
        key: 'NIM'          // Foreign key untuk NIM
      }
    },
    NIP_koor_mbkm: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'KoorMbkm',  // Nama tabel KoorMbkm di database
        key: 'NIP_koor_mbkm' // Foreign key untuk NIP_koor_mbkm
      }
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'pendaftaran_akun',
    timestamps: false
  });

  // Mendefinisikan relasi antara PendaftaranAkun dengan Mahasiswa dan KoorMbkm
  PendaftaranAkun.associate = (models) => {
    PendaftaranAkun.belongsTo(models.Mahasiswa, { foreignKey: 'NIM' });
    PendaftaranAkun.belongsTo(models.KoorMbkm, { foreignKey: 'NIP_koor_mbkm' });
  };

  return PendaftaranAkun;
};
