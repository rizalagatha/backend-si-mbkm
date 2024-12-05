/**
 * @swagger
 * components:
 *   schemas:
 *     PendaftaranMbkm:
 *       type: object
 *       required:
 *         - id_pendaftaran_mbkm
 *         - NIM
 *         - NIP_dosbing
 *         - NIP_koor_mbkm
 *         - id_program_mbkm
 *         - nama_berkas
 *         - status
 *         - tanggal
 *       properties:
 *         id_pendaftaran_mbkm:
 *           type: integer
 *           description: ID dari Pendaftaran MBKM
 *         NIM:
 *           type: integer
 *           description: Nomor Induk Mahasiswa yang mendaftar MBKM
 *         NIP_dosbing:
 *           type: integer
 *           description: Nomor Induk Pegawai dosen pembimbing
 *         NIP_koor_mbkm:
 *           type: integer
 *           description: Nomor Induk Pegawai koordinator MBKM
 *         id_program_mbkm:
 *           type: integer
 *           description: ID program MBKM
 *         nama_berkas:
 *           type : string
 *           description: Nama berkas yang terkait Pendaftaran MBKM
 *         status:
 *           type: string
 *           description: Status pendaftaran program
 *         tanggal:
 *           type: string
 *           format: date-time
 *           description: Tanggal pendaftaran MBKM
 *       example:
 *         id_pendaftaran_mbkm: 1
 *         NIM: 123456789
 *         NIP_dosbing: 987654321
 *         NIP_koor_mbkm: 123456789
 *         id_program_mbkm: 1
 *         nama_berkas: doksli supersemar.pdf
 *         status:pending
 *         tanggal: "2024-10-11T10:00:00Z"
 */

const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createPendaftaranMbkm,
  getAllPendaftaranMbkm,
  getPendaftaranMbkmById,
  getPendaftaranMbkmByNIM,
  updatePendaftaranMbkm,
  deletePendaftaranMbkm
} = require('../controllers/pendaftaranMbkmController');

/**
 * @swagger
 * tags:
 *   name: PendaftaranMbkm
 *   description: API untuk mengelola data Pendaftaran MBKM
 *   digunakan oleh: mahasiswa, koor_mbkm
 */

/**
 * @swagger
 * /api/pendaftaran-mbkm:
 *   post:
 *     summary: Menambahkan data Pendaftaran MBKM baru
 *     tags: [PendaftaranMbkm]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PendaftaranMbkm'
 *     responses:
 *       201:
 *         description: Data Pendaftaran MBKM berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Pesan berhasil
 *                   example: Data Pendaftaran MBKM berhasil ditambahkan
 *                 data:
 *                   $ref: '#/components/schemas/PendaftaranMbkm'
 *       400:
 *         description: Permintaan tidak valid (misalnya, data tidak lengkap)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Pesan kesalahan
 *                   example: Data tidak lengkap
 *       401:
 *         description: Akses tidak sah (token tidak valid atau tidak ada)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Pesan kesalahan
 *                   example: Token tidak valid
 *       500:
 *         description: Kesalahan pada server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Pesan kesalahan
 *                   example: Terjadi kesalahan pada server
 */
router.post('/', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), createPendaftaranMbkm);

/**
 * @swagger
 * /api/pendaftaran-mbkm:
 *   get:
 *     summary: Mengambil semua data Pendaftaran MBKM
 *     tags: [PendaftaranMbkm]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data Pendaftaran MBKM
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PendaftaranMbkm'
 */
router.get('/', getAllPendaftaranMbkm);

/**
 * @swagger
 * /api/pendaftaran-mbkm/{id}:
 *   get:
 *     summary: Mengambil data Pendaftaran MBKM berdasarkan ID
 *     tags: [PendaftaranMbkm]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Pendaftaran MBKM yang akan diambil
 *     responses:
 *       200:
 *         description: Berhasil mengambil data Pendaftaran MBKM
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PendaftaranMbkm'
 */
router.get('/:id', getPendaftaranMbkmById);

/**
 * @swagger
 * /api/pendaftaran-mbkm/nim/{NIM}:
 *   get:
 *     summary: Mengambil data Pendaftaran MBKM berdasarkan NIM
 *     tags: [PendaftaranMbkm]
 *     parameters:
 *       - in: path
 *         name: NIM
 *         required: true
 *         schema:
 *           type: string
 *         description: NIM Mahasiswa yang akan diambil
 *     responses:
 *       200:
 *         description: Berhasil mengambil data Pendaftaran MBKM berdasarkan NIM
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PendaftaranMbkm'
 *       404:
 *         description: Tidak ada data Pendaftaran MBKM ditemukan untuk NIM ini
 *       500:
 *         description: Terjadi kesalahan pada server
 */

router.get('/nim/:NIM', getPendaftaranMbkmByNIM);

/**
 * @swagger
 * /api/pendaftaran-mbkm/{id}:
 *   put:
 *     summary: Memperbarui data Pendaftaran MBKM berdasarkan ID
 *     tags: [PendaftaranMbkm]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Pendaftaran MBKM yang akan diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PendaftaranMbkm'
 *     responses:
 *       200:
 *         description: Data Pendaftaran MBKM berhasil diperbarui
 */
router.put('/:id', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), updatePendaftaranMbkm);

/**
 * @swagger
 * /api/pendaftaran-mbkm/{id}:
 *   delete:
 *     summary: Menghapus data Pendaftaran MBKM berdasarkan ID
 *     tags: [PendaftaranMbkm]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Pendaftaran MBKM yang akan dihapus
 *     responses:
 *       204:
 *         description: Data Pendaftaran MBKM berhasil dihapus
 */
router.delete('/:id', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), deletePendaftaranMbkm);

module.exports = router;
