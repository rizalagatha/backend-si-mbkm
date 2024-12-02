/**
 * @swagger
 * components:
 *   schemas:
 *     ProgramMBKM:
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
 *         role:
 *           type: string
 *           description: Posisi yang tersedia untuk program MBKM
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
 *         role: "Backend Developer"
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
  getProgramMbkmByNim,
  updateProgramMbkm,
  deleteProgramMbkm
} = require('../controllers/programMbkmController');

/**
 * @swagger
 * tags:
 *   name: ProgramMBKM
 *   description: API untuk mengelola data program MBKM
 *   digunakan oleh : koor_mbkm, mahasiswa, dosbing
 */

/**
 * @swagger
 * /api/program-mbkm:
 *   post:
 *     summary: Create a new Program MBKM
 *     security:
 *       - bearerAuth: []
 *     tags: [ProgramMBKM]
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
 *     tags: [ProgramMBKM]
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
 *     tags: [ProgramMBKM]
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
 * /api/program-mbkm/nim/{NIM}:
 *   get:
 *     summary: Get Program MBKM by Mahasiswa's NIM
 *     tags: [ProgramMBKM]
 *     parameters:
 *       - in: path
 *         name: NIM
 *         required: true
 *         schema:
 *           type: integer
 *         description: NIM of the Mahasiswa
 *     responses:
 *       200:
 *         description: List of Program MBKM
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_program_mbkm:
 *                     type: integer
 *                     description: ID of the Program MBKM
 *                   company:
 *                     type: string
 *                     description: Name of the company
 *                   deskripsi:
 *                     type: string
 *                     description: Description of the program
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                   mahasiswa:
 *                     type: object
 *                     properties:
 *                       NIM:
 *                         type: integer
 *                       nama_mahasiswa:
 *                         type: string
 *       404:
 *         description: No Program MBKM found for the given NIM
 *       500:
 *         description: Server error
 */

router.get('/nim/:NIM', getProgramMbkmByNim);

/**
 * @swagger
 * /api/program-mbkm/{id}:
 *   put:
 *     summary: Update a Program MBKM
 *     security:
 *       - bearerAuth: []
 *     tags: [ProgramMBKM]
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
 *     tags: [ProgramMBKM]
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
