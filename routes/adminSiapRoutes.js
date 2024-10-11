const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  getAdminSiap,
  createAdminSiap,
  updateAdminSiap,
  deleteAdminSiap
} = require('../controllers/adminSiapController');

/**
 * @swagger
 * /api/admin-siap:
 *   get:
 *     summary: Retrieve a list of Admin Siap
 *     tags: [AdminSiap]
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
router.get('/', getAdminSiap);

/**
 * @swagger
 * /api/admin-siap:
 *   post:
 *     summary: Create a new Admin Siap
 *     tags: [AdminSiap]
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
 *     tags: [AdminSiap]
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
 *     tags: [AdminSiap]
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
