const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Mahasiswa = require('./mahasiswa'); // Import model Mahasiswa untuk relasi foreign key

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
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  NIM: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Mahasiswa, // Menghubungkan foreign key ke model Mahasiswa
      key: 'NIM',
    }
  }
}, {
  tableName: 'logbook',
  timestamps: false,
});

// Mendefinisikan relasi antara tabel logbook dan mahasiswa
Logbook.belongsTo(Mahasiswa, { foreignKey: 'NIM' });

module.exports = Logbook;
