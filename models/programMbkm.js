const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProgramMbkm = sequelize.define('ProgramMbkm', {
    id_program_mbkm: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    waktu_pelaksanaan: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
    NIM: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Mahasiswa',
        key: 'NIM',
      },
    },
  }, {
    tableName: 'program_mbkm',
    timestamps: false,
  });

  ProgramMbkm.associate = (models) => {
    ProgramMbkm.belongsTo(models.Categories, { foreignKey: 'category_id' });
    ProgramMbkm.belongsTo(models.Mahasiswa, { foreignKey: 'NIM', as: 'mahasiswa' });
  };

  return ProgramMbkm;
};
