const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Mahasiswa = sequelize.define('Mahasiswa', {
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
      references: {
        model: 'ProgramMbkm',
        key: 'id_program_mbkm',
      },
    },
    NIP_dosbing: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Dosbing',
        key: 'NIP_dosbing',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  }, {
    tableName: 'mahasiswa',
    timestamps: false,
  });

  Mahasiswa.associate = (models) => {
    Mahasiswa.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Mahasiswa;
};
