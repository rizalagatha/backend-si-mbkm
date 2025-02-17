/**
 * @swagger
 * components:
 *   schemas:
 *     MatkulKnvrs:
 *       type: object
 *       required:
 *         - nama_matkul
 *         - kode_matkul
 *         - sks
 *         - jenis_matkul
 *       properties:
 *         id_matkul_knvrs:
 *           type: integer
 *           description: ID auto increment untuk data mata kuliah konversi
 *         nama_matkul:
 *           type: string
 *           description: Nama mata kuliah
 *         kode_matkul:
 *           type: string
 *           description: Kode mata kuliah
 *         sks:
 *           type: integer
 *           description: Jumlah SKS mata kuliah
 *         jenis_matkul:
 *           type: string
 *           enum: [pilihan_ganjil, pilihan_genap, wajib]
 *           description: Jenis mata kuliah (pilihan ganjil, pilihan genap, atau wajib)
 */


const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  getAllMatkulKnvrs,
  getMatkulKnvrsById,
  createMatkulKnvrs,
  updateMatkulKnvrs,
  deleteMatkulKnvrs
} = require('../controllers/matkulKnvrsController');

/**
 * @swagger
 * tags:
 *   name: MatkulKnvrs
 *   description: API untuk mengelola data Mata Kuliah Konversi
 */

/**
 * @swagger
 * /api/matkul-knvrs:
 *   get:
 *     summary: Ambil semua data Matkul Konversi
 *     tags: [MatkulKnvrs]
 *     responses:
 *       200:
 *         description: Daftar Matkul Konversi berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MatkulKnvrs'
 *       500:
 *         description: Terjadi kesalahan saat mengambil data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Terjadi kesalahan saat mengambil data Matkul Konversi."
 */

router.get('/', getAllMatkulKnvrs);

/**
 * @swagger
 * /api/matkul-knvrs/{id_matkul_knvrs}:
 *   get:
 *     summary: Ambil data Matkul Konversi berdasarkan ID
 *     tags: [MatkulKnvrs]
 *     parameters:
 *       - in: path
 *         name: id_matkul_knvrs
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Matkul Konversi yang ingin diambil datanya
 *     responses:
 *       200:
 *         description: Data Matkul Konversi berhasil diambil.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MatkulKnvrs'
 *       404:
 *         description: Data tidak ditemukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Matkul Konversi dengan ID 1 tidak ditemukan."
 *       500:
 *         description: Terjadi kesalahan saat mengambil data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Terjadi kesalahan saat mengambil data Matkul Konversi."
 */

router.get('/:id_matkul_knvrs', getMatkulKnvrsById);

/**
 * @swagger
 * /api/matkul-knvrs:
 *   post:
 *     summary: Buat Matkul Konversi baru
 *     tags: [MatkulKnvrs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_matkul:
 *                 type: string
 *               kode_matkul:
 *                 type: string
 *               sks:
 *                 type: integer
 *               jenis_matkul:
 *                 type: string
 *                 enum: [pilihan_ganjil, pilihan_genap, wajib]
 *             required:
 *               - nama_matkul
 *               - kode_matkul
 *               - sks
 *               - jenis_matkul
 *     responses:
 *       201:
 *         description: Matkul Konversi berhasil dibuat.
 */

router.post('/', authenticateToken, authorize(['koor_mbkm']), createMatkulKnvrs);

/**
 * @swagger
 * /api/matkul-knvrs/{id_matkul_knvrs}:
 *   put:
 *     summary: Perbarui data Matkul Konversi berdasarkan ID
 *     tags: [MatkulKnvrs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_matkul_knvrs
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Matkul Konversi yang ingin diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama_matkul:
 *                 type: string
 *               kode_matkul:
 *                 type: string
 *               sks:
 *                 type: integer
 *               jenis_matkul:
 *                 type: string
 *                 enum: [pilihan_ganjil, pilihan_genap, wajib]
 *             required:
 *               - nama_matkul
 *               - kode_matkul
 *               - sks
 *               - jenis_matkul
 *     responses:
 *       200:
 *         description: Data berhasil diperbarui.
 */

router.put('/:id_matkul_knvrs', authenticateToken, authorize(['koor_mbkm']), updateMatkulKnvrs);

/**
 * @swagger
 * /api/matkul-knvrs/{id_matkul_knvrs}:
 *   delete:
 *     summary: Hapus data Matkul Konversi berdasarkan ID
 *     tags: [MatkulKnvrs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_matkul_knvrs
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Matkul Konversi yang ingin dihapus
 *     responses:
 *       204:
 *         description: Data berhasil dihapus.
 */
router.delete('/:id_matkul_knvrs', authenticateToken, authorize(['koor_mbkm']), deleteMatkulKnvrs);

module.exports = router;
