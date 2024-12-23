const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');  // Mengacu pada tabel User

const Dosbing = sequelize.define('Dosbing', {
  NIP_dosbing: {
    type: DataTypes.STRING,
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
      model: User,
      key: 'id'  // id dari tabel User
    }
  }
}, {
  tableName: 'dosbing',
  timestamps: false
});

// Menambahkan relasi antara Dosbing dan User
Dosbing.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Dosbing;
