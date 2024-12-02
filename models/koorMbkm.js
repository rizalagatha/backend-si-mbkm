module.exports = (sequelize, DataTypes) => {
  const KoorMbkm = sequelize.define('KoorMbkm', {
    NIP_koor_mbkm: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    nama_koor_mbkm: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,  // Foreign key untuk relasi ke User
      allowNull: true,
      references: {
        model: 'User',  // Nama tabel User di database
        key: 'id'       // id sebagai primary key
      }
    }
  }, {
    tableName: 'koor_mbkm',
    timestamps: false
  });

  // Menambahkan relasi antara KoorMbkm dan User
  KoorMbkm.associate = (models) => {
    KoorMbkm.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return KoorMbkm;
};
