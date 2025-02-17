// logbookRoutes.js

/**
 * @swagger
 * tags:
 *   name: Logbook
 *   description: API untuk mengelola data logbook
 *   digunakan oleh: mahasiswa, dosbing, koor_mbkm, admin_siap
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Logbook:
 *       type: object
 *       required:
 *         - judul
 *         - subjek
 *         - nama_file
 *         - NIM
 *         - jenis
 *         - status
 *       properties:
 *         judul:
 *           type: string
 *           description: Judul Logbook
 *         subjek:
 *           type: string
 *           description: Subjek Logbook
 *         nama_file:
 *           type: string
 *           description: File logbook yang akan diunggah
 *         jenis:
 *           type: string
 *           description: Jenis Logbook
 *         status:
 *           type: string
 *           description: Status Verifikasi Logbook
 *         NIM:
 *           type: integer
 *           description: NIM mahasiswa yang mengunggah logbook
 */

/**
 * @swagger
 * /api/logbook:
 *   get:
 *     summary: Mengambil semua data logbook
 *     tags: [Logbook]
 *     responses:
 *       200:
 *         description: Daftar logbook
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_logbook:
 *                     type: integer
 *                   judul:
 *                     type: string
 *                   subjek:
 *                     type: string
 *                   nama_file:
 *                     type: string
 *                   jenis:
 *                     type: string
 *                   status:
 *                     type: string
 *                   NIM:
 *                     type: integer
 */

/**
 * @swagger
 * /api/logbook/{id}:
 *   get:
 *     summary: Mengambil data logbook berdasarkan ID
 *     tags: [Logbook]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dari logbook
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Satu file logbook
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_logbook:
 *                   type: integer
 *                 judul:
 *                   type: string
 *                 subjek:
 *                   type: string
 *                 nama_file:
 *                   type: string
 *                 jenis:
 *                   type: string
 *                 status:
 *                   type: string
 *                 NIM:
 *                   type: integer
 *       404:
 *         description: Logbook tidak ditemukan
 */

/**
 * @swagger
 * /api/logbook/nim/{NIM}:
 *   get:
 *     summary: Mengambil data logbook berdasarkan NIM
 *     tags: [Logbook]
 *     parameters:
 *       - in: path
 *         name: NIM
 *         required: true
 *         schema:
 *           type: integer
 *         description: NIM mahasiswa
 *     responses:
 *       200:
 *         description: Logbook ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Logbook'
 *       404:
 *         description: Tidak ada logbook untuk NIM yang diberikan
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/logbook:
 *   post:
 *     summary: Membuat logbook baru
 *     tags: [Logbook]
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
 *               judul:
 *                 type: string
 *               subjek:
 *                 type: string
 *               jenis:
 *                 type: string
 *               status:
 *                 type: string
 *               NIM:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Logbook berhasil dibuat
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/logbook/{id}:
 *   put:
 *     summary: Memperbarui data logbook
 *     tags: [Logbook]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID logbook yang akan diperbarui
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               judul:
 *                 type: string
 *               subjek:
 *                 type: string
 *               jenis:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logbook berhasil diperbarui
 *       404:
 *         description: Logbook tidak ditemukan
 */

/**
 * @swagger
 * /api/logbook/{id}:
 *   delete:
 *     summary: Menghapus logbook
 *     tags: [Logbook]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dari logbook yang akan dihapus
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Logbook berhasil dihapus
 *       404:
 *         description: Logbook tidak ditemukan
 */

const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const logbookController = require('../controllers/logbookController');
const upload = require('../middlewares/upload');

// Mendapatkan semua logbooks
router.get('/', authenticateToken, authorize(['koor_mbkm', 'adminSiap', 'dosbing', 'mahasiswa']), logbookController.getAllLogbooks);

// Mendapatkan logbook berdasarkan ID
router.get('/:id', logbookController.getLogbookById);

router.get('/nim/:NIM', logbookController.getLogbooksByNIM);

// Membuat logbook baru
router.post('/', authenticateToken, authorize(['mahasiswa']), upload.single('file'), logbookController.createLogbook);

// Mengupdate logbook berdasarkan ID
router.put('/:id', authenticateToken, authorize(['mahasiswa','dosbing']), logbookController.updateLogbook);

// Menghapus logbook berdasarkan ID
router.delete('/:id', authenticateToken, authorize(['mahasiswa']), logbookController.deleteLogbook);

module.exports = router;
