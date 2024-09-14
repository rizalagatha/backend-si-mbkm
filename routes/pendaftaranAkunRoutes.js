const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createPendaftaranAkun,
  getAllPendaftaranAkun,
  getPendaftaranAkunById,
  updatePendaftaranAkun,
  deletePendaftaranAkun
} = require('../controllers/pendaftaranAkunController');

router.post('/', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), createPendaftaranAkun);
router.get('/', getAllPendaftaranAkun);
router.get('/:id', getPendaftaranAkunById);
router.put('/:id', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), updatePendaftaranAkun);
router.delete('/:id', authenticateToken, authorize(['mahasiswa', 'koor_mbkm']), deletePendaftaranAkun);

module.exports = router;
