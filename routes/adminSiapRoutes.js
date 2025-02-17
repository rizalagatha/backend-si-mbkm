/**
 * @swagger
 * components:
 *   schemas:
 *     AdminSIAP:
 *       type: object
 *       required:
 *         - NIP_admin_siap
 *         - nama_admin_siap
 *       properties:
 *         NIP_admin_siap:
 *           type: integer
 *           description: Nomor Induk Pegawai dari Admin SIAP
 *         nama_admin_siap:
 *           type: string
 *           description: Nama lengkap Admin SIAP
 */

const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  getAdminSiap,
  getAdminSiapByNIP,
  createAdminSiap,
  updateAdminSiap,
  deleteAdminSiap
} = require('../controllers/adminSiapController');

/**
 * @swagger
 * tags:
 *   name: AdminSIAP
 *   description: API untuk mengelola data Admin SIAP
 *   digunakan oleh : koor_mbkm
 */

/**
 * @swagger
 * /api/admin-siap:
 *   get:
 *     summary: Retrieve a list of Admin Siap
 *     tags: [AdminSIAP]
 *     responses:
 *       200:
 *         description: A list of Admin Siap.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminSiap'
 */

router.get('/', authenticateToken, authorize(['koor_mbkm', 'adminSiap', 'dosbing', 'mahasiswa']), getAdminSiap);

/**
 * @swagger
 * /api/admin-siap/{NIP_admin_siap}:
 *   get:
 *     summary: Ambil data Admin SIAP berdasarkan NIP
 *     tags: [AdminSIAP]
 *     parameters:
 *       - in: path
 *         name: NIP_admin_siap
 *         required: true
 *         schema:
 *           type: integer
 *         description: NIP admin siap yang ingin diambil datanya
 *     responses:
 *       200:
 *         description: Data berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: integer
 *                   example: "Data Admin SIAP untuk NIP 12345 berhasil diambil."
 *                 data:
 *                   $ref: '#/components/schemas/AdminSiap'
 *       404:
 *         description: Tidak ada data untuk NIP yang diminta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: "Admin dengan NIP 12345 tidak ditemukan."
 *       500:
 *         description: Terjadi kesalahan saat mengambil data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: "Terjadi kesalahan saat mengambil data Admin SIAP."
 */

router.get('/:NIP_admin_siap', authenticateToken, authorize(['koor_mbkm', 'adminSiap', 'dosbing', 'mahasiswa']), getAdminSiapByNIP);

/**
 * @swagger
 * /api/admin-siap:
 *   post:
 *     summary: Create a new Admin Siap
 *     tags: [AdminSIAP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminSiap'
 *     responses:
 *       201:
 *         description: Admin Siap created successfully.
 */
router.post('/', authenticateToken, authorize(['koor_mbkm']), createAdminSiap);

/**
 * @swagger
 * /api/admin-siap/{NIP_admin_siap}:
 *   put:
 *     summary: Update an Admin Siap
 *     tags: [AdminSIAP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: NIP_admin_siap
 *         required: true
 *         schema:
 *           type: integer
 *         description: NIP of the Admin Siap
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminSiap'
 *     responses:
 *       200:
 *         description: Admin Siap updated successfully.
 */
router.put('/:NIP_admin_siap', authenticateToken, authorize(['koor_mbkm']), updateAdminSiap);

/**
 * @swagger
 * /api/admin-siap/{NIP_admin_siap}:
 *   delete:
 *     summary: Delete an Admin Siap
 *     tags: [AdminSIAP]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: NIP_admin_siap
 *         required: true
 *         schema:
 *           type: integer
 *         description: NIP of the Admin Siap to delete
 *     responses:
 *       204:
 *         description: Admin Siap deleted successfully.
 */
router.delete('/:NIP_admin_siap', authenticateToken, authorize(['koor_mbkm']), deleteAdminSiap);

module.exports = router;
