/**
 * @swagger
 * components:
 *   schemas:
 *     Riwayat:
 *       type: object
 *       required:
 *         - id_riwayat
 *         - NIM
 *         - nilai
 *         - nama_berkas
 *         - id_program_mbkm
 *       properties:
 *         id_riwayat:
 *           type: integer
 *           description: ID Riwayat
 *         NIM:
 *           type: integer
 *           description: Nomor Induk Mahasiswa
 *         nilai:
 *           type: integer
 *           description: Nilai dari riwayat
 *         nama_berkas:
 *           type: string
 *           description: Nama file berkas
 *         id_program_mbkm:
 *           type: integer
 *           description: ID program MBKM yang terkait
 *       example:
 *         id_riwayat: 1
 *         NIM: 123456789
 *         nilai: 90
 *         nama_berkas: "transkrip.pdf"
 *         id_program_mbkm: 1
 */

const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createRiwayat,
  getAllRiwayat,
  getRiwayatById,
  getRiwayatByNIM,
  updateRiwayat,
  deleteRiwayat,
} = require('../controllers/riwayatController');

/**
 * @swagger
 * tags:
 *   name: Riwayat
 *   description: API untuk mengelola data Riwayat MBKM
 */

/**
 * @swagger
 * /api/riwayat:
 *   post:
 *     summary: Menambahkan data Riwayat baru
 *     tags: [Riwayat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Riwayat'
 *     responses:
 *       201:
 *         description: Data Riwayat berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Riwayat created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Riwayat'
 *       400:
 *         description: Permintaan tidak valid
 *       500:
 *         description: Kesalahan pada server
 */
router.post('/', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), createRiwayat);

/**
 * @swagger
 * /api/riwayat:
 *   get:
 *     summary: Mengambil semua data Riwayat
 *     tags: [Riwayat]
 *     responses:
 *       200:
 *         description: Berhasil mengambil semua data Riwayat
 */
router.get('/', getAllRiwayat);

/**
 * @swagger
 * /api/riwayat/{id}:
 *   get:
 *     summary: Mengambil data Riwayat berdasarkan ID
 *     tags: [Riwayat]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Riwayat yang akan diambil
 *     responses:
 *       200:
 *         description: Berhasil mengambil data Riwayat
 *       404:
 *         description: Data Riwayat tidak ditemukan
 */
router.get('/:id', getRiwayatById);

/**
 * @swagger
 * /api/riwayat/nim/{NIM}:
 *   get:
 *     summary: Mengambil data Riwayat berdasarkan NIM
 *     tags: [Riwayat]
 *     parameters:
 *       - in: path
 *         name: NIM
 *         required: true
 *         schema:
 *           type: integer
 *         description: NIM Mahasiswa yang akan diambil
 *     responses:
 *       200:
 *         description: Berhasil mengambil data Riwayat
 *       404:
 *         description: Data Riwayat tidak ditemukan
 */
router.get('/nim/:NIM', getRiwayatByNIM);

/**
 * @swagger
 * /api/riwayat/{id}:
 *   put:
 *     summary: Memperbarui data Riwayat berdasarkan ID
 *     tags: [Riwayat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Riwayat yang akan diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Riwayat'
 *     responses:
 *       200:
 *         description: Data Riwayat berhasil diperbarui
 */
router.put('/:id', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), updateRiwayat);

/**
 * @swagger
 * /api/riwayat/{id}:
 *   delete:
 *     summary: Menghapus data Riwayat berdasarkan ID
 *     tags: [Riwayat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Riwayat yang akan dihapus
 *     responses:
 *       204:
 *         description: Data Riwayat berhasil dihapus
 */
router.delete('/:id', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), deleteRiwayat);

module.exports = router;
