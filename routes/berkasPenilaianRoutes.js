const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createBerkasPenilaian,
  getAllBerkasPenilaian,
  getBerkasPenilaianById,
  updateBerkasPenilaian,
  deleteBerkasPenilaian
} = require('../controllers/berkasPenilaianController');

router.post('/', authenticateToken, authorize(['adminSiap', 'mahasiswa', 'koor_mbkm']), createBerkasPenilaian);
router.put('/:id', authenticateToken, authorize(['adminSiap', 'dosbing', 'koor_mbkm']), updateBerkasPenilaian);
router.get('/', authenticateToken, authorize(['koor_mbkm', 'adminSiap', 'dosbing', 'mahasiswa']), getAllBerkasPenilaian);
router.get('/:id', authenticateToken, authorize(['koor_mbkm', 'adminSiap','dosbing', 'mahasiswa']), getBerkasPenilaianById);
router.delete('/:id', authenticateToken, authorize(['adminSiap','mahasiswa', 'koor_mbkm']), deleteBerkasPenilaian);

module.exports = router;
