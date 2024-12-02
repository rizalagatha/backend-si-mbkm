module.exports = (sequelize, DataTypes) => {
  const Dosbing = sequelize.define('Dosbing', {
    NIP_dosbing: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    nama_dosbing: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,  // Foreign key untuk relasi ke User
      allowNull: true,
      references: {
        model: 'User', // Nama tabel User di database
        key: 'id'      // id sebagai primary key
      }
    }
  }, {
    tableName: 'dosbing',
    timestamps: false
  });

  // Menambahkan relasi antara Dosbing dan User
  Dosbing.associate = (models) => {
    Dosbing.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Dosbing;
};
