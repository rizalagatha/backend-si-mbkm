module.exports = (sequelize, DataTypes) => {
  const Logbook = sequelize.define('Logbook', {
    id_logbook: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subjek: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nama_file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NIM: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Mahasiswa',  // Menunjukkan nama tabel Mahasiswa di database
        key: 'NIM',          // Foreign key untuk NIM
      }
    }
  }, {
    tableName: 'logbook',
    timestamps: false,
  });

  // Mendefinisikan relasi antara Logbook dan Mahasiswa
  Logbook.associate = (models) => {
    Logbook.belongsTo(models.Mahasiswa, { foreignKey: 'NIM' });
  };

  return Logbook;
};
