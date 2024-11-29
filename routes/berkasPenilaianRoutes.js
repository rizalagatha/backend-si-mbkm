/**
 * @swagger
 * components:
 *   schemas:
 *     BerkasPenilaian:
 *       type: object
 *       required:
 *         - id_pendaftaran_mbkm
 *         - id_konversi_nilai
 *         - NIP_dosbing
 *         - nama_berkas
 *       properties:
 *         id_berkas_penilaian:
 *           type: integer
 *           description: ID unik dari berkas penilaian
 *         id_pendaftaran_mbkm:
 *           type: integer
 *           description: ID pendaftaran MBKM yang terkait dengan berkas ini
 *         id_konversi_nilai:
 *           type: integer
 *           description: ID konversi nilai yang terkait dengan berkas ini
 *         NIP_dosbing:
 *           type: integer
 *           description: NIP dosbing yang terkait dengan berkas ini
 *         nama_berkas:
 *           type: string
 *           description: Nama berkas penilaian
 */

const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createBerkasPenilaian,
  getAllBerkasPenilaian,
  getBerkasPenilaianById,
  updateBerkasPenilaian,
  deleteBerkasPenilaian
} = require('../controllers/berkasPenilaianController');

/**
 * @swagger
 * tags:
 *   name: BerkasPenilaian
 *   description: API untuk mengelola data berkas penilaian
 */

/**
 * @swagger
 * /api/berkas-penilaian:
 *   post:
 *     summary: Menambahkan berkas penilaian baru
 *     tags: [BerkasPenilaian]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BerkasPenilaian'
 *     responses:
 *       201:
 *         description: Berkas penilaian berhasil ditambahkan
 */
router.post('/', authenticateToken, authorize(['adminSiap', 'mahasiswa', 'koor_mbkm']), createBerkasPenilaian);

/**
 * @swagger
 * /api/berkas-penilaian/{id}:
 *   put:
 *     summary: Memperbarui berkas penilaian berdasarkan ID
 *     tags: [BerkasPenilaian]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID berkas penilaian yang akan diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BerkasPenilaian'
 *     responses:
 *       200:
 *         description: Berkas penilaian berhasil diperbarui
 */
router.put('/:id', authenticateToken, authorize(['adminSiap', 'dosbing', 'koor_mbkm']), updateBerkasPenilaian);

/**
 * @swagger
 * /api/berkas-penilaian:
 *   get:
 *     summary: Mengambil semua data berkas penilaian
 *     tags: [BerkasPenilaian]
 *     responses:
 *       200:
 *         description: Berhasil mengambil semua data berkas penilaian
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BerkasPenilaian'
 */
router.get('/', authenticateToken, authorize(['koor_mbkm', 'adminSiap', 'dosbing', 'mahasiswa']), getAllBerkasPenilaian);

/**
 * @swagger
 * /api/berkas-penilaian/{id}:
 *   get:
 *     summary: Mengambil berkas penilaian berdasarkan ID
 *     tags: [BerkasPenilaian]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID berkas penilaian yang akan diambil
 *     responses:
 *       200:
 *         description: Berhasil mengambil data berkas penilaian
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BerkasPenilaian'
 */
router.get('/:id', authenticateToken, authorize(['koor_mbkm', 'adminSiap','dosbing', 'mahasiswa']), getBerkasPenilaianById);

/**
 * @swagger
 * /api/berkas-penilaian/{id}:
 *   delete:
 *     summary: Menghapus berkas penilaian berdasarkan ID
 *     tags: [BerkasPenilaian]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID berkas penilaian yang akan dihapus
 *     responses:
 *       204:
 *         description: Berkas penilaian berhasil dihapus
 */
router.delete('/:id', authenticateToken, authorize(['adminSiap','mahasiswa', 'koor_mbkm']), deleteBerkasPenilaian);

module.exports = router;
