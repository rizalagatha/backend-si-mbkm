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
