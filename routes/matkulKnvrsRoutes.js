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

router.get('/', getAllMatkulKnvrs);

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
 *             $ref: '#/components/schemas/MatkulKnvrs'
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
 *             $ref: '#/components/schemas/MatkulKnvrs'
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
