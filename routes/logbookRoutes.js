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
 * /api/logbook:
 *   get:
 *     summary: Get all logbooks
 *     tags: [Logbook]
 *     responses:
 *       200:
 *         description: A list of logbooks
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
 *                   NIM:
 *                     type: integer
 */

/**
 * @swagger
 * /api/logbook/{id}:
 *   get:
 *     summary: Get a logbook by ID
 *     tags: [Logbook]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the logbook
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single logbook entry
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
 *                 NIM:
 *                   type: integer
 *       404:
 *         description: Logbook not found
 */

/**
 * @swagger
 * /api/logbook:
 *   post:
 *     summary: Create a new logbook entry
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
 *               NIM:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Logbook created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/logbook/{id}:
 *   put:
 *     summary: Update a logbook entry
 *     tags: [Logbook]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the logbook to update
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
 *     responses:
 *       200:
 *         description: Logbook updated successfully
 *       404:
 *         description: Logbook not found
 */

/**
 * @swagger
 * /api/logbook/{id}:
 *   delete:
 *     summary: Delete a logbook entry
 *     tags: [Logbook]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the logbook to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Logbook deleted successfully
 *       404:
 *         description: Logbook not found
 */

const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const logbookController = require('../controllers/logbookController');
const upload = require('../middlewares/upload');

// Mendapatkan semua logbooks
router.get('/', logbookController.getAllLogbooks);

// Mendapatkan logbook berdasarkan ID
router.get('/:id', logbookController.getLogbookById);

// Membuat logbook baru
router.post('/', authenticateToken, authorize(['mahasiswa']), upload.single('file'), logbookController.createLogbook);

// Mengupdate logbook berdasarkan ID
router.put('/:id', authenticateToken, authorize(['mahasiswa','dosbing']), logbookController.updateLogbook);

// Menghapus logbook berdasarkan ID
router.delete('/:id', logbookController.deleteLogbook);

module.exports = router;
