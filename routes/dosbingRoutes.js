const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createDosbing,
  getAllDosbing,
  getDosbingByNIP,
  updateDosbing,
  deleteDosbing
} = require('../controllers/dosbingController');

router.post('/', authenticateToken, authorize(['koor_mbkm']), createDosbing);
router.get('/', getAllDosbing);
router.get('/:NIP_dosbing', getDosbingByNIP);
router.put('/:NIP_dosbing', authenticateToken, authorize(['koor_mbkm']), updateDosbing);
router.delete('/:NIP_dosbing', authenticateToken, authorize(['koor_mbkm']), deleteDosbing);

module.exports = router;
