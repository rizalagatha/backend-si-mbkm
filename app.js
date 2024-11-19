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
  const pendaftaranAkunRoutes = require('./routes/pendaftaranAkunRoutes');
  const pendaftaranMbkmRoutes = require('./routes/pendaftaranMbkmRoutes');
  const pengumumanRoutes = require('./routes/pengumumanRoutes');
  const programMbkmRoutes = require('./routes/programMbkmRoutes');
  const authRoutes = require('./routes/authRoutes');
  const categoriesRoutes = require('./routes/categoriesRoutes');
  const uploadRoutes = require('./routes/uploadRoutes');
  const logbookRoutes = require('./routes/logbookRoutes');

  dotenv.config();

  const app = express();
  app.use(cors());
  app.use(express.json());

  swaggerSetup(app);

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
  app.use('/api/pendaftaran-akun', pendaftaranAkunRoutes);
  app.use('/api/pendaftaran-mbkm', pendaftaranMbkmRoutes);
  app.use('/api/pengumuman', pengumumanRoutes);
  app.use('/api/program-mbkm', programMbkmRoutes);
  app.use('/auth', authRoutes);
  app.use('/api', categoriesRoutes);
  app.use('/api/', uploadRoutes);
  app.use('/api/logbook', logbookRoutes);
  
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
