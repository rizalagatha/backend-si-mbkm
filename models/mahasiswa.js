module.exports = (sequelize, DataTypes) => {
  const Mahasiswa = sequelize.define(
    'Mahasiswa',
    {
      NIM: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      nama_mahasiswa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      semester: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_program_mbkm: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      NIP_dosbing: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'mahasiswa',
      timestamps: false,
    }
  );

  // Definisikan asosiasi di dalam fungsi associate
  Mahasiswa.associate = (models) => {
    Mahasiswa.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Mahasiswa.hasMany(models.ProgramMbkm, { foreignKey: 'NIM', as: 'programs' });
  };

  return Mahasiswa;
};
