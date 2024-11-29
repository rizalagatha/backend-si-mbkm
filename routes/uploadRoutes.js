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
const upload = require('../middlewares/upload');
const {
  uploadFile,
  getFilesByType
}= require('../controllers/uploadController');
const { authenticateToken, authorize } = require('../middlewares/auth');
const berkasPenilaianController = require('../controllers/berkasPenilaianController');

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: API untuk mengelola pengunggahan file
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Unggah berkas dengan jenis berkas tertentu
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File yang akan diunggah
 *               id_pendaftaran_mbkm:
 *                 type: integer
 *                 description: ID pendaftaran MBKM
 *               id_konversi_nilai:
 *                 type: integer
 *                 description: ID konversi nilai (opsional)
 *               jenis_berkas:
 *                 type: string
 *                 enum: [CV, transkrip, KTP, sertifikat, dokumen_tambahan]
 *                 description: Jenis berkas yang akan diunggah
 *     responses:
 *       200:
 *         description: Berkas berhasil diunggah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/BerkasPenilaian'
 *       400:
 *         description: Validasi gagal (file atau jenis berkas tidak valid)
 *       500:
 *         description: Terjadi kesalahan saat mengunggah berkas
 */

router.post('/upload', authenticateToken, authorize(['mahasiswa']), upload.single('file'), uploadFile);
/**
 * @swagger
 * /api/berkas/{jenis_berkas}:
 *   get:
 *     summary: Ambil data berdasarkan jenis berkas
 *     tags: [Berkas]
 *     parameters:
 *       - in: path
 *         name: jenis_berkas
 *         schema:
 *           type: string
 *           enum: [CV, transkrip, KTP, sertifikat, dokumen_tambahan]
 *         required: true
 *         description: Jenis berkas yang ingin diambil
 *     responses:
 *       200:
 *         description: Data berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BerkasPenilaian'
 *       400:
 *         description: Jenis file tidak valid
 *       404:
 *         description: Tidak ada data untuk jenis file yang diminta
 *       500:
 *         description: Terjadi kesalahan saat mengambil data
 */


router.get('/berkas-penilaian/:jenis_berkas', getFilesByType);
  
module.exports = router;
