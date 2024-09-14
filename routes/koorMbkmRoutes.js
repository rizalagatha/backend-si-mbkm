const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createKoorMbkm,
  getAllKoorMbkm,
  getKoorMbkmByNIP,
  updateKoorMbkm,
  deleteKoorMbkm
} = require('../controllers/koorMbkmController');

router.post('/', authenticateToken, authorize(['koor_mbkm']), createKoorMbkm);
router.get('/', getAllKoorMbkm);
router.get('/:NIP_koor_mbkm', getKoorMbkmByNIP);
router.put('/:NIP_koor_mbkm', authenticateToken, authorize(['koor_mbkm']), updateKoorMbkm);
router.delete('/:NIP_koor_mbkm', authenticateToken, authorize(['koor_mbkm']), deleteKoorMbkm);

module.exports = router;
