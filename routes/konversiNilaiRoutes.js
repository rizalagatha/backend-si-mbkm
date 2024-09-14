const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createKonversiNilai,
  getAllKonversiNilai,
  getKonversiNilaiById,
  updateKonversiNilai,
  deleteKonversiNilai
} = require('../controllers/konversiNilaiController');

router.post('/', authenticateToken, authorize(['admin_siap', 'koor_mbkm']), createKonversiNilai);
router.get('/', authenticateToken, authorize(['admin_siap', 'koor_mbkm']), getAllKonversiNilai);
router.get('/:id', authenticateToken, authorize(['admin_siap', 'koor_mbkm']), getKonversiNilaiById);
router.put('/:id', authenticateToken, authorize(['admin_siap', 'koor_mbkm']), updateKonversiNilai);
router.delete('/:id', authenticateToken, authorize(['admin_siap', 'koor_mbkm']), deleteKonversiNilai);

module.exports = router;
