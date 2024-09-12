// config/db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Mengambil variabel dari .env
dotenv.config();

// Buat instance Sequelize untuk koneksi ke PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres', // Dialek yang digunakan
    port: process.env.DB_PORT,
});

// Cek koneksi ke database
sequelize.authenticate()
    .then(() => {
        console.log('Connected to PostgreSQL database.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
