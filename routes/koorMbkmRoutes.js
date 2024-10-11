const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createKoorMbkm,
  getAllKoorMbkm,
  getKoorMbkmByNIP,
  updateKoorMbkm,
  deleteKoorMbkm
} = require('../controllers/koorMbkmController');

/**
 * @swagger
 * tags:
 *   name: KoorMbkm
 *   description: API untuk mengelola data Koor MBKM
 */

/**
 * @swagger
 * /api/koor-mbkm:
 *   post:
 *     summary: Menambahkan data Koor MBKM baru
 *     tags: [KoorMbkm]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/KoorMbkm'
 *     responses:
 *       201:
 *         description: Data Koor MBKM berhasil ditambahkan
 */
router.post('/', authenticateToken, authorize(['koor_mbkm']), createKoorMbkm);

/**
 * @swagger
 * /api/koor-mbkm:
 *   get:
 *     summary: Mengambil semua data Koor MBKM
 *     tags: [KoorMbkm]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data Koor MBKM
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/KoorMbkm'
 */
router.get('/', getAllKoorMbkm);

/**
 * @swagger
 * /api/koor-mbkm/{NIP_koor_mbkm}:
 *   get:
 *     summary: Mengambil data Koor MBKM berdasarkan NIP
 *     tags: [KoorMbkm]
 *     parameters:
 *       - in: path
 *         name: NIP_koor_mbkm
 *         required: true
 *         schema:
 *           type: integer
 *         description: NIP Koor MBKM yang akan diambil
 *     responses:
 *       200:
 *         description: Berhasil mengambil data Koor MBKM
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KoorMbkm'
 */
router.get('/:NIP_koor_mbkm', getKoorMbkmByNIP);

/**
 * @swagger
 * /api/koor-mbkm/{NIP_koor_mbkm}:
 *   put:
 *     summary: Memperbarui data Koor MBKM berdasarkan NIP
 *     tags: [KoorMbkm]
 *     parameters:
 *       - in: path
 *         name: NIP_koor_mbkm
 *         required: true
 *         schema:
 *           type: integer
 *         description: NIP Koor MBKM yang akan diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/KoorMbkm'
 *     responses:
 *       200:
 *         description: Data Koor MBKM berhasil diperbarui
 */
router.put('/:NIP_koor_mbkm', authenticateToken, authorize(['koor_mbkm']), updateKoorMbkm);

/**
 * @swagger
 * /api/koor-mbkm/{NIP_koor_mbkm}:
 *   delete:
 *     summary: Menghapus data Koor MBKM berdasarkan NIP
 *     tags: [KoorMbkm]
 *     parameters:
 *       - in: path
 *         name: NIP_koor_mbkm
 *         required: true
 *         schema:
 *           type: integer
 *         description: NIP Koor MBKM yang akan dihapus
 *     responses:
 *       204:
 *         description: Data Koor MBKM berhasil dihapus
 */
router.delete('/:NIP_koor_mbkm', authenticateToken, authorize(['koor_mbkm']), deleteKoorMbkm);

module.exports = router;
