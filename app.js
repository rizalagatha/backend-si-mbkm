const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const axios = require('axios');
const dns = require('dns');
const path = require('path');
const swaggerSetup = require('./config/swagger');
const userRoutes = require('./routes/userRoutes');
const adminSiapRoutes = require('./routes/adminSiapRoutes');
const berkasPenilaianRoutes = require('./routes/berkasPenilaianRoutes');
const dosbingRoutes = require('./routes/dosbingRoutes');
const konversiNilaiRoutes = require('./routes/konversiNilaiRoutes');
const koorMbkmRoutes = require('./routes/koorMbkmRoutes');
const mahasiswaRoutes = require('./routes/mahasiswaRoutes');
const pendaftaranMbkmRoutes = require('./routes/pendaftaranMbkmRoutes');
const pengumumanRoutes = require('./routes/pengumumanRoutes');
const programMbkmRoutes = require('./routes/programMbkmRoutes');
const matkulKnvrsRoutes = require ('./routes/matkulKnvrsRoutes');
const authRoutes = require('./routes/authRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const logbookRoutes = require('./routes/logbookRoutes');
const Categories = require('./models/categories');
const ProgramMbkm = require('./models/programMbkm');
const Mahasiswa = require('./models/mahasiswa');
const Dosbing = require('./models/dosbing');
const User = require('./models/user');
const PendaftaranMbkm = require('./models/pendaftaranMbkm');
const MatkulKnvrs = require('./models/matkulKnvrs');

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://si-mbkm-tekkom.vercel.app'],  // Ganti dengan domain frontend Anda
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Tambahkan metode yang diperlukan
  allowedHeaders: ['Content-Type', 'Authorization'], // Tambahkan header yang dibutuhkan
}));
app.use(express.json());

swaggerSetup(app);

// Define models in an object
const models = { Categories, ProgramMbkm, Mahasiswa, Dosbing, User, PendaftaranMbkm, MatkulKnvrs };

// Call the associate method for each model
Object.values(models).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate();
  }
});

// Tambahkan route untuk root URL
app.get('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello from Vercel API!' });
});

// Gunakan routes untuk user
app.use('/api/users', userRoutes);
// Use routes
app.use('/api/admin-siap', adminSiapRoutes);
// Tambahkan rute lain sesuai tabel-tabel lainnya
app.use('/api/berkas-penilaian', berkasPenilaianRoutes);
app.use('/api/dosbing', dosbingRoutes);
app.use('/api/konversi-nilai', konversiNilaiRoutes);
app.use('/api/koor-mbkm', koorMbkmRoutes);
app.use('/api/mahasiswa', mahasiswaRoutes);
app.use('/api/pendaftaran-mbkm', pendaftaranMbkmRoutes);
app.use('/api/pengumuman', pengumumanRoutes);
app.use('/api/program-mbkm', programMbkmRoutes);
app.use('/auth', authRoutes);
app.use('/api', categoriesRoutes);
app.use('/api/', uploadRoutes);
app.use('/api/logbook', logbookRoutes);
app.use('/api/matkul-knvrs', matkulKnvrsRoutes);

app.use('/swagger-ui', express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist')));

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

sequelize.sync({ alter: true })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to synchronize the models:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
