/**
 * @swagger
 * components:
 *   schemas:
 *     Pengumuman:
 *       type: object
 *       required:
 *         - id_pengumuman
 *         - judul
 *         - isi
 *         - tanggal
 *         - NIP_koor_mbkm
 *       properties:
 *         id_pengumuman:
 *           type: integer
 *           description: ID dari pengumuman
 *         judul:
 *           type: string
 *           description: Judul pengumuman
 *         isi:
 *           type: string
 *           description: Isi dari pengumuman
 *         tanggal:
 *           type: string
 *           format: date-time
 *           description: Tanggal pengumuman
 *         NIP_koor_mbkm:
 *           type: integer
 *           description: NIP dari koordinator MBKM yang membuat pengumuman
 *       example:
 *         id_pengumuman: 1
 *         judul: "Pengumuman Penting"
 *         isi: "Ini adalah isi dari pengumuman penting."
 *         tanggal: "2024-10-12T08:00:00Z"
 *         NIP_koor_mbkm: 123456789
 */

const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createPengumuman,
  getAllPengumuman,
  getPengumumanById,
  updatePengumuman,
  deletePengumuman
} = require('../controllers/pengumumanController');

/**
 * @swagger
 * tags:
 *   name: Pengumuman
 *   description: API untuk mengelola data pengumuman
 *   digunakan oleh : koor_mbkm
 */

/**
 * @swagger
 * /api/pengumuman:
 *   post:
 *     summary: Create a new pengumuman
 *     security:
 *       - bearerAuth: []
 *     tags: [Pengumuman]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pengumuman'
 *     responses:
 *       201:
 *         description: Pengumuman created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, authorize(['koor_mbkm']), createPengumuman);

/**
 * @swagger
 * /api/pengumuman:
 *   get:
 *     summary: Get all pengumuman
 *     tags: [Pengumuman]
 *     responses:
 *       200:
 *         description: A list of pengumuman
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pengumuman'
 */
router.get('/', getAllPengumuman);

/**
 * @swagger
 * /api/pengumuman/{id}:
 *   get:
 *     summary: Get a pengumuman by ID
 *     tags: [Pengumuman]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The pengumuman ID
 *     responses:
 *       200:
 *         description: The pengumuman data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pengumuman'
 *       404:
 *         description: Pengumuman not found
 */
router.get('/:id', getPengumumanById);

/**
 * @swagger
 * /api/pengumuman/{id}:
 *   put:
 *     summary: Update a pengumuman
 *     security:
 *       - bearerAuth: []
 *     tags: [Pengumuman]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The pengumuman ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pengumuman'
 *     responses:
 *       200:
 *         description: Pengumuman updated successfully
 *       404:
 *         description: Pengumuman not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticateToken, authorize(['koor_mbkm']), updatePengumuman);

/**
 * @swagger
 * /api/pengumuman/{id}:
 *   delete:
 *     summary: Delete a pengumuman
 *     security:
 *       - bearerAuth: []
 *     tags: [Pengumuman]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The pengumuman ID
 *     responses:
 *       204:
 *         description: Pengumuman deleted successfully
 *       404:
 *         description: Pengumuman not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticateToken, authorize(['koor_mbkm']), deletePengumuman);

module.exports = router;
