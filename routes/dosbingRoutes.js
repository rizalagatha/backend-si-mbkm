const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createDosbing,
  getAllDosbing,
  getDosbingByNIP,
  updateDosbing,
  deleteDosbing
} = require('../controllers/dosbingController');

/**
 * @swagger
 * tags:
 *   name: Dosbing
 *   description: API untuk mengelola data dosbing
 */

/**
 * @swagger
 * /api/dosbing:
 *   post:
 *     summary: Menambahkan dosbing baru
 *     tags: [Dosbing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dosbing'
 *     responses:
 *       201:
 *         description: Dosbing berhasil ditambahkan
 */
router.post('/', authenticateToken, authorize(['koor_mbkm']), createDosbing);

/**
 * @swagger
 * /api/dosbing:
 *   get:
 *     summary: Mengambil semua data dosbing
 *     tags: [Dosbing]
 *     responses:
 *       200:
 *         description: Berhasil mengambil semua data dosbing
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dosbing'
 */
router.get('/', getAllDosbing);

/**
 * @swagger
 * /api/dosbing/{NIP_dosbing}:
 *   get:
 *     summary: Mengambil data dosbing berdasarkan NIP
 *     tags: [Dosbing]
 *     parameters:
 *       - in: path
 *         name: NIP_dosbing
 *         required: true
 *         schema:
 *           type: integer
 *         description: NIP dosbing yang akan diambil
 *     responses:
 *       200:
 *         description: Berhasil mengambil data dosbing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dosbing'
 */
router.get('/:NIP_dosbing', getDosbingByNIP);

/**
 * @swagger
 * /api/dosbing/{NIP_dosbing}:
 *   put:
 *     summary: Memperbarui data dosbing berdasarkan NIP
 *     tags: [Dosbing]
 *     parameters:
 *       - in: path
 *         name: NIP_dosbing
 *         required: true
 *         schema:
 *           type: integer
 *         description: NIP dosbing yang akan diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dosbing'
 *     responses:
 *       200:
 *         description: Data dosbing berhasil diperbarui
 */
router.put('/:NIP_dosbing', authenticateToken, authorize(['koor_mbkm']), updateDosbing);

/**
 * @swagger
 * /api/dosbing/{NIP_dosbing}:
 *   delete:
 *     summary: Menghapus dosbing berdasarkan NIP
 *     tags: [Dosbing]
 *     parameters:
 *       - in: path
 *         name: NIP_dosbing
 *         required: true
 *         schema:
 *           type: integer
 *         description: NIP dosbing yang akan dihapus
 *     responses:
 *       204:
 *         description: Dosbing berhasil dihapus
 */
router.delete('/:NIP_dosbing', authenticateToken, authorize(['koor_mbkm']), deleteDosbing);

module.exports = router;
