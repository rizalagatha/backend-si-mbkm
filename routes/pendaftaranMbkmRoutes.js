/**
 * @swagger
 * components:
 *   schemas:
 *     PendaftaranMbkm:
 *       type: object
 *       required:
 *         - id_pendaftaran_mbkm
 *         - NIM
 *         - tanggal
 *         - id_program_mbkm
 *         - status
 *       properties:
 *         id_pendaftaran_mbkm:
 *           type: integer
 *           description: ID dari Pendaftaran MBKM
 *         NIM:
 *           type: integer
 *           description: Nomor Induk Mahasiswa yang mendaftar MBKM
 *         tanggal:
 *           type: string
 *           format: date-time
 *           description: Tanggal pendaftaran MBKM
 *         id_program_mbkm:
 *           type: integer
 *           description: ID program MBKM yang dipilih mahasiswa
 *         status:
 *           type: string
 *           description: Status pendaftaran program (misalnya "pending", "diterima", "ditolak")
 *         NIP_dosbing:
 *           type: string
 *           description: Nomor Induk Pegawai (NIP) dosen pembimbing, opsional
 *         matkul_knvrs:
 *           type: array
 *           description: List mata kuliah konversi yang terdaftar dalam program MBKM
 *           items:
 *             type: object
 *             properties:
 *               id_matkul_knvrs:
 *                 type: integer
 *                 description: ID mata kuliah konversi
 *               nama_matkul_knvrs:
 *                 type: string
 *                 description: Nama mata kuliah konversi
 *       example:
 *         id_pendaftaran_mbkm: 1
 *         NIM: 123456789
 *         tanggal: "2024-10-11T10:00:00Z"
 *         id_program_mbkm: 1
 *         status: "pending"
 *         NIP_dosbing: "1987654321"
 *         matkul_knvrs:
 *           - id_matkul_knvrs: 5
 *             nama_matkul_knvrs: "Matematika Diskrit"
 *           - id_matkul_knvrs: 7
 *             nama_matkul_knvrs: "Algoritma dan Struktur Data"
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
 *       401:
 *         description: Akses tidak sah (token tidak valid atau tidak ada)
 *       500:
 *         description: Kesalahan pada server
 */

router.post('/', authenticateToken, authorize(['admin_siap', 'mahasiswa', 'koor_mbkm']), createPendaftaranMbkm);

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
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */

router.get('/:id', getPendaftaranMbkmById);

/**
 * @swagger
 * /api/pendaftaran-mbkm/nim/{NIM}:
 *   get:
 *     summary: Mengambil data Pendaftaran MBKM berdasarkan NIM mahasiswa
 *     tags: [PendaftaranMbkm]
 *     parameters:
 *       - in: path
 *         name: NIM
 *         required: true
 *         schema:
 *           type: integer
 *         description: NIM Mahasiswa yang akan dicari
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
 *       400:
 *         description: Permintaan tidak valid
 *       401:
 *         description: Akses tidak sah
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */

router.put('/:id', authenticateToken, authorize(['admin_siap', 'mahasiswa', 'koor_mbkm']), updatePendaftaranMbkm);

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
 *       401:
 *         description: Akses tidak sah
 *       404:
 *         description: Data tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */

router.delete('/:id', authenticateToken, authorize(['admin_siap', 'mahasiswa', 'koor_mbkm']), deletePendaftaranMbkm);

module.exports = router;
