/**
 * @swagger
 * components:
 *   schemas:
 *     PendaftaranAkun:
 *       type: object
 *       required:
 *         - id_pendaftaran_akun
 *         - NIM
 *         - NIP_koor_mbkm
 *         - tanggal
 *       properties:
 *         id_pendaftaran_akun:
 *           type: integer
 *           description: ID dari Pendaftaran Akun
 *         NIM:
 *           type: integer
 *           description: Nomor Induk Mahasiswa yang mendaftar
 *         NIP_koor_mbkm:
 *           type: integer
 *           description: NIP Koordinator MBKM yang menyetujui pendaftaran
 *         tanggal:
 *           type: string
 *           format: date-time
 *           description: Tanggal pendaftaran akun
 *       example:
 *         id_pendaftaran_akun: 1
 *         NIM: 123456789
 *         NIP_koor_mbkm: 987654321
 *         tanggal: "2024-10-11T10:00:00Z"
 */


const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createPendaftaranAkun,
  getAllPendaftaranAkun,
  getPendaftaranAkunById,
  updatePendaftaranAkun,
  deletePendaftaranAkun
} = require('../controllers/pendaftaranAkunController');

/**
 * @swagger
 * tags:
 *   name: PendaftaranAkun
 *   description: API untuk mengelola data Pendaftaran Akun
 */

/**
 * @swagger
 * /api/pendaftaran-akun:
 *   post:
 *     summary: Menambahkan data Pendaftaran Akun baru
 *     tags: [PendaftaranAkun]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PendaftaranAkun'
 *     responses:
 *       201:
 *         description: Data Pendaftaran Akun berhasil ditambahkan
 */
router.post('/', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), createPendaftaranAkun);

/**
 * @swagger
 * /api/pendaftaran-akun:
 *   get:
 *     summary: Mengambil semua data Pendaftaran Akun
 *     tags: [PendaftaranAkun]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data Pendaftaran Akun
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PendaftaranAkun'
 */
router.get('/', getAllPendaftaranAkun);

/**
 * @swagger
 * /api/pendaftaran-akun/{id}:
 *   get:
 *     summary: Mengambil data Pendaftaran Akun berdasarkan ID
 *     tags: [PendaftaranAkun]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Pendaftaran Akun yang akan diambil
 *     responses:
 *       200:
 *         description: Berhasil mengambil data Pendaftaran Akun
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PendaftaranAkun'
 */
router.get('/:id', getPendaftaranAkunById);

/**
 * @swagger
 * /api/pendaftaran-akun/{id}:
 *   put:
 *     summary: Memperbarui data Pendaftaran Akun berdasarkan ID
 *     tags: [PendaftaranAkun]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Pendaftaran Akun yang akan diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PendaftaranAkun'
 *     responses:
 *       200:
 *         description: Data Pendaftaran Akun berhasil diperbarui
 */
router.put('/:id', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), updatePendaftaranAkun);

/**
 * @swagger
 * /api/pendaftaran-akun/{id}:
 *   delete:
 *     summary: Menghapus data Pendaftaran Akun berdasarkan ID
 *     tags: [PendaftaranAkun]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Pendaftaran Akun yang akan dihapus
 *     responses:
 *       204:
 *         description: Data Pendaftaran Akun berhasil dihapus
 */
router.delete('/:id', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), deletePendaftaranAkun);

module.exports = router;
