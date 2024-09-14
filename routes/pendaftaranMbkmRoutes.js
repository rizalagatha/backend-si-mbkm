const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createPendaftaranMbkm,
  getAllPendaftaranMbkm,
  getPendaftaranMbkmById,
  updatePendaftaranMbkm,
  deletePendaftaranMbkm
} = require('../controllers/pendaftaranMbkmController');

router.post('/', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), createPendaftaranMbkm);
router.get('/', getAllPendaftaranMbkm);
router.get('/:id', getPendaftaranMbkmById);
router.put('/:id', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), updatePendaftaranMbkm);
router.delete('/:id', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), deletePendaftaranMbkm);

module.exports = router;
