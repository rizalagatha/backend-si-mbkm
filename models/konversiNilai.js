module.exports = (sequelize, DataTypes) => {
  const KonversiNilai = sequelize.define('KonversiNilai', {
    id_konversi_nilai: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    NIP_admin_siap: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'AdminSiap', // Nama tabel AdminSiap di database
        key: 'NIP_admin_siap' // NIP_admin_siap sebagai primary key di tabel AdminSiap
      }
    },
    id_berkas_penilaian: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BerkasPenilaian', // Nama tabel BerkasPenilaian di database
        key: 'id_berkas_penilaian' // id_berkas_penilaian sebagai primary key di tabel BerkasPenilaian
      }
    },
    nama_berkas: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'BerkasPenilaian', // Nama tabel BerkasPenilaian di database
        key: 'nama_berkas' // nama_berkas di tabel BerkasPenilaian
      }
    },
    nilai_akhir: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'konversi_nilai',
    timestamps: false
  });

  // Menambahkan asosiasi
  KonversiNilai.associate = (models) => {
    // Relasi dengan AdminSiap
    KonversiNilai.belongsTo(models.AdminSiap, { foreignKey: 'NIP_admin_siap', as: 'adminSiap' });
    
    // Relasi dengan BerkasPenilaian
    KonversiNilai.belongsTo(models.BerkasPenilaian, { foreignKey: 'id_berkas_penilaian', as: 'berkasPenilaian' });
  };

  return KonversiNilai;
};
