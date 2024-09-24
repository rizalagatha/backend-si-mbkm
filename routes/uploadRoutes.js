const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');  // Pastikan rute ke upload.js benar
const BerkasPenilaian = require('../models/berkasPenilaian');

// Rute untuk unggah CV
router.post('/upload/cv', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Tidak ada file yang diunggah.');
    }

    // Simpan informasi file ke basis data
    const newBerkas = await BerkasPenilaian.create({
      id_pendaftaran_mbkm: req.body.id_pendaftaran_mbkm, 
      id_konversi_nilai: req.body.id_konversi_nilai,     
      nama_berkas: req.file.filename
    });

    res.status(200).json({ message: 'KTP berhasil diunggah', data: newBerkas });
} catch (error) {
  console.error(error);  // Log error untuk debugging
  res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah KTP' });
}
});

// Rute untuk unggah transkrip
router.post('/upload/transkrip', upload.single('transkrip'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Tidak ada file yang diunggah.');
    }

    // Simpan informasi file ke basis data
    const newBerkas = await BerkasPenilaian.create({
      id_pendaftaran_mbkm: req.body.id_pendaftaran_mbkm,
      id_konversi_nilai: req.body.id_konversi_nilai,
      nama_berkas: req.file.filename
    });

    res.status(200).json({ message: 'Transkrip berhasil diunggah', data: newBerkas });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah transkrip' });
  }
});

router.post('/upload/ktp', upload.single('ktp'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('Tidak ada file KTP yang diunggah.');
      }
  
      // Simpan informasi file ke basis data
      const newBerkas = await BerkasPenilaian.create({
        id_pendaftaran_mbkm: req.body.id_pendaftaran_mbkm, 
        id_konversi_nilai: req.body.id_konversi_nilai,     
        nama_berkas: req.file.filename
      });
  
      res.status(200).json({ message: 'KTP berhasil diunggah', data: newBerkas });
    } catch (error) {
      res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah KTP' });
    }
  });
  
  // Rute untuk unggah sertifikat pengalaman organisasi
  router.post('/upload/sertifikat', upload.single('sertifikat_pengalaman'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('Tidak ada file sertifikat yang diunggah.');
      }
  
      // Simpan informasi file ke basis data
      const newBerkas = await BerkasPenilaian.create({
        id_pendaftaran_mbkm: req.body.id_pendaftaran_mbkm, 
        id_konversi_nilai: req.body.id_konversi_nilai,     
        nama_berkas: req.file.filename
      });
  
      res.status(200).json({ message: 'Sertifikat berhasil diunggah', data: newBerkas });
    } catch (error) {
      res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah sertifikat' });
    }
  });
  
  // Rute untuk unggah dokumen tambahan
  router.post('/upload/dokumen-tambahan', upload.single('dokumen_tambahan'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('Tidak ada file dokumen tambahan yang diunggah.');
      }
  
      // Simpan informasi file ke basis data
      const newBerkas = await BerkasPenilaian.create({
        id_pendaftaran_mbkm: req.body.id_pendaftaran_mbkm, 
        id_konversi_nilai: req.body.id_konversi_nilai,     
        nama_berkas: req.file.filename
      });
  
      res.status(200).json({ message: 'Dokumen tambahan berhasil diunggah', data: newBerkas });
    } catch (error) {
      res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah dokumen tambahan' });
    }
  });

module.exports = router;
