/**
 * @swagger
 * components:
 *   schemas:
 *     BerkasPenilaian:
 *       type: object
 *       required:
 *         - id_pendaftaran_mbkm
 *         - id_konversi_nilai
 *         - nama_berkas
 *       properties:
 *         id_pendaftaran_mbkm:
 *           type: integer
 *           description: ID dari pendaftaran MBKM
 *         id_konversi_nilai:
 *           type: integer
 *           description: ID dari konversi nilai
 *         nama_berkas:
 *           type: string
 *           description: Nama file yang diunggah
 *       example:
 *         id_pendaftaran_mbkm: 1
 *         id_konversi_nilai: 1
 *         nama_berkas: "cv_mahasiswa.pdf"
 */

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');  // Pastikan rute ke upload.js benar
const BerkasPenilaian = require('../models/berkasPenilaian');

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: API untuk mengelola pengunggahan file
 */

/**
 * @swagger
 * /api/upload/cv:
 *   post:
 *     summary: Unggah CV mahasiswa
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cv:
 *                 type: string
 *                 format: binary
 *                 description: File CV mahasiswa
 *               id_pendaftaran_mbkm:
 *                 type: integer
 *               id_konversi_nilai:
 *                 type: integer
 *     responses:
 *       200:
 *         description: CV berhasil diunggah
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BerkasPenilaian'
 *       400:
 *         description: Tidak ada file yang diunggah
 *       500:
 *         description: Terjadi kesalahan saat mengunggah CV
 */

// Rute untuk unggah CV
router.post('/upload/cv', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file CV yang diunggah.' });

    const newBerkas = await BerkasPenilaian.create({
      id_pendaftaran_mbkm: req.body.id_pendaftaran_mbkm,
      id_konversi_nilai: req.body.id_konversi_nilai,
      nama_berkas: req.file.path // URL Cloudinary
    });

    res.status(200).json({ message: 'CV berhasil diunggah', data: newBerkas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah CV' });
  }
});


/**
 * @swagger
 * /api/upload/transkrip:
 *   post:
 *     summary: Unggah Transkrip mahasiswa
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               transkrip:
 *                 type: string
 *                 format: binary
 *                 description: File transkrip mahasiswa
 *               id_pendaftaran_mbkm:
 *                 type: integer
 *               id_konversi_nilai:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Transkrip berhasil diunggah
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BerkasPenilaian'
 *       400:
 *         description: Tidak ada file yang diunggah
 *       500:
 *         description: Terjadi kesalahan saat mengunggah transkrip
 */

// Rute untuk unggah transkrip
router.post('/upload/transkrip', upload.single('transkrip'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Tidak ada file transkrip yang diunggah.' });

    const newBerkas = await BerkasPenilaian.create({
      id_pendaftaran_mbkm: req.body.id_pendaftaran_mbkm,
      id_konversi_nilai: req.body.id_konversi_nilai,
      nama_berkas: req.file.path
    });

    res.status(200).json({ message: 'Transkrip berhasil diunggah', data: newBerkas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah transkrip' });
  }
});

/**
 * @swagger
 * /api/upload/ktp:
 *   post:
 *     summary: Unggah KTP mahasiswa
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               ktp:
 *                 type: string
 *                 format: binary
 *                 description: File KTP mahasiswa
 *               id_pendaftaran_mbkm:
 *                 type: integer
 *               id_konversi_nilai:
 *                 type: integer
 *     responses:
 *       200:
 *         description: KTP berhasil diunggah
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BerkasPenilaian'
 *       400:
 *         description: Tidak ada file yang diunggah
 *       500:
 *         description: Terjadi kesalahan saat mengunggah KTP
 */

router.post('/upload/ktp', upload.single('ktp'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Tidak ada file KTP yang diunggah.');
    }

    // Simpan URL file ke basis data
    const newBerkas = await BerkasPenilaian.create({
      id_pendaftaran_mbkm: req.body.id_pendaftaran_mbkm,
      id_konversi_nilai: req.body.id_konversi_nilai,
      nama_berkas: req.file.path // URL Cloudinary tersimpan di req.file.path
    });

    res.status(200).json({ message: 'KTP berhasil diunggah', data: newBerkas });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah KTP' });
  }
});
  
/**
 * @swagger
 * /api/upload/sertifikat:
 *   post:
 *     summary: Unggah Sertifikat pengalaman mahasiswa
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               sertifikat_pengalaman:
 *                 type: string
 *                 format: binary
 *                 description: File sertifikat pengalaman organisasi mahasiswa
 *               id_pendaftaran_mbkm:
 *                 type: integer
 *               id_konversi_nilai:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sertifikat berhasil diunggah
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BerkasPenilaian'
 *       400:
 *         description: Tidak ada file yang diunggah
 *       500:
 *         description: Terjadi kesalahan saat mengunggah sertifikat
 */

  // Rute untuk unggah sertifikat pengalaman organisasi
  router.post('/upload/sertifikat', upload.single('sertifikat_pengalaman'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('Tidak ada file sertifikat yang diunggah.');
      }
  
      // Simpan URL file ke basis data
      const newBerkas = await BerkasPenilaian.create({
        id_pendaftaran_mbkm: req.body.id_pendaftaran_mbkm,
        id_konversi_nilai: req.body.id_konversi_nilai,
        nama_berkas: req.file.path // URL Cloudinary tersimpan di req.file.path
      });
  
      res.status(200).json({ message: 'Sertifikat berhasil diunggah', data: newBerkas });
    } catch (error) {
      res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah sertifikat' });
    }
  });

/**
 * @swagger
 * /api/upload/dokumen-tambahan:
 *   post:
 *     summary: Unggah Dokumen Tambahan mahasiswa
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               dokumen_tambahan:
 *                 type: string
 *                 format: binary
 *                 description: File dokumen tambahan mahasiswa
 *               id_pendaftaran_mbkm:
 *                 type: integer
 *               id_konversi_nilai:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Dokumen tambahan berhasil diunggah
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BerkasPenilaian'
 *       400:
 *         description: Tidak ada file yang diunggah
 *       500:
 *         description: Terjadi kesalahan saat mengunggah dokumen tambahan
 */

  // Rute untuk unggah dokumen tambahan
  router.post('/upload/dokumen-tambahan', upload.single('dokumen_tambahan'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('Tidak ada file dokumen tambahan yang diunggah.');
      }
  
      // Simpan URL file ke basis data
      const newBerkas = await BerkasPenilaian.create({
        id_pendaftaran_mbkm: req.body.id_pendaftaran_mbkm,
        id_konversi_nilai: req.body.id_konversi_nilai,
        nama_berkas: req.file.path // URL Cloudinary tersimpan di req.file.path
      });
  
      res.status(200).json({ message: 'Dokumen tambahan berhasil diunggah', data: newBerkas });
    } catch (error) {
      res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah dokumen tambahan' });
    }
  });

module.exports = router;
