/**
 * @swagger
 * components:
 *   schemas:
 *     ProgramMbkm:
 *       type: object
 *       required:
 *         - id_program_mbkm
 *         - company
 *         - category_id
 *       properties:
 *         id_program_mbkm:
 *           type: integer
 *           description: ID dari Program MBKM
 *         company:
 *           type: string
 *           description: Nama perusahaan untuk program MBKM
 *         deskripsi:
 *           type: string
 *           description: Deskripsi program MBKM
 *         syarat:
 *           type: string
 *           description: Syarat mengikuti program MBKM
 *         status:
 *           type: string
 *           description: Status dari program MBKM
 *         date:
 *           type: string
 *           format: date-time
 *           description: Tanggal program dimulai
 *         waktu_pelaksanaan:
 *           type: string
 *           format: date-time
 *           description: Waktu pelaksanaan program MBKM
 *         category_id:
 *           type: string
 *           description: ID kategori program
 *       example:
 *         id_program_mbkm: 1
 *         company: "Perusahaan A"
 *         deskripsi: "Program magang untuk mahasiswa"
 *         syarat: "KTP, Surat Keterangan Vaksin, Surat Keterangan Makan Siang Gratis"
 *         status: "Aktif"
 *         date: "2024-10-12T08:00:00Z"
 *         waktu_pelaksanaan: "2024-10-13T08:00:00Z"
 *         category_id: iisma
 */

const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createProgramMbkm,
  getAllProgramMbkm,
  getProgramMbkmById,
  updateProgramMbkm,
  deleteProgramMbkm
} = require('../controllers/programMbkmController');

/**
 * @swagger
 * /api/program-mbkm:
 *   post:
 *     summary: Create a new Program MBKM
 *     security:
 *       - bearerAuth: []
 *     tags: [ProgramMbkm]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProgramMbkm'
 *     responses:
 *       201:
 *         description: Program MBKM created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, authorize(['koor_mbkm']), createProgramMbkm);

/**
 * @swagger
 * /api/program-mbkm:
 *   get:
 *     summary: Get all Program MBKM
 *     tags: [ProgramMbkm]
 *     responses:
 *       200:
 *         description: A list of Program MBKM
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProgramMbkm'
 */
router.get('/', getAllProgramMbkm);

/**
 * @swagger
 * /api/program-mbkm/{id}:
 *   get:
 *     summary: Get a Program MBKM by ID
 *     tags: [ProgramMbkm]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Program MBKM
 *     responses:
 *       200:
 *         description: The Program MBKM data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProgramMbkm'
 *       404:
 *         description: Program MBKM not found
 */
router.get('/:id', getProgramMbkmById);

/**
 * @swagger
 * /api/program-mbkm/{id}:
 *   put:
 *     summary: Update a Program MBKM
 *     security:
 *       - bearerAuth: []
 *     tags: [ProgramMbkm]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Program MBKM
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProgramMbkm'
 *     responses:
 *       200:
 *         description: Program MBKM updated successfully
 *       404:
 *         description: Program MBKM not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticateToken, authorize(['koor_mbkm']), updateProgramMbkm);

/**
 * @swagger
 * /api/program-mbkm/{id}:
 *   delete:
 *     summary: Delete a Program MBKM
 *     security:
 *       - bearerAuth: []
 *     tags: [ProgramMbkm]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Program MBKM
 *     responses:
 *       204:
 *         description: Program MBKM deleted successfully
 *       404:
 *         description: Program MBKM not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticateToken, authorize(['koor_mbkm']), deleteProgramMbkm);

module.exports = router;
