const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createMahasiswa,
  getAllMahasiswa,
  getMahasiswaByNIM,
  updateMahasiswa,
  deleteMahasiswa
} = require('../controllers/mahasiswaController');

router.post('/', authenticateToken, authorize(['koor_mbkm']), createMahasiswa);
router.get('/', getAllMahasiswa);
router.get('/:NIM', getMahasiswaByNIM);
router.put('/:NIM', authenticateToken, authorize(['koor_mbkm']), updateMahasiswa);
router.delete('/:NIM', authenticateToken, authorize(['koor_mbkm']), deleteMahasiswa);

module.exports = router;
