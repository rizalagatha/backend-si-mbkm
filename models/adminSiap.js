module.exports = (sequelize, DataTypes) => {
  const AdminSiap = sequelize.define('AdminSiap', {
    NIP_admin_siap: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    nama_admin_siap: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users', // Nama tabel di database (plural sesuai konvensi)
        key: 'id',
      },
    },
  }, {
    tableName: 'admin_siap',
    timestamps: false,
  });

  // Relasi
  AdminSiap.associate = (models) => {
    AdminSiap.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return AdminSiap;
};
