const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const axios = require('axios');
const dns = require('dns');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
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

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SI-MBKM API',
      version: '1.0.0',
      description: 'Dokumentasi API untuk Sistem MBKM',
    },
    servers: [
      {
        url: 'https://backend-si-mbkm.vercel.app',
      },
    ],
  },
  apis: ['./routes/*.js'], // Lokasi file route Anda
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
app.get('/api/test-supabase', async (req, res) => {
  try {
    const response = await axios.get('https://heqapgykhabdiolwblvj.supabase.co/rest/v1/', {
      headers: {
        apikey: process.env.SUPABASE_API_KEY,
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to Supabase', error: error.message });
  }
});

app.get('/api/check-dns', (req, res) => {
  dns.lookup('db.heqapgykhabdiolwblvj.supabase.co', (err, address) => {
    if (err) {
      return res.status(500).json({ message: 'DNS lookup failed', error: err.message });
    }
    res.status(200).json({ message: 'DNS lookup succeeded', address });
  });
});

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
