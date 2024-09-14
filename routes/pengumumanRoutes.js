const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createPengumuman,
  getAllPengumuman,
  getPengumumanById,
  updatePengumuman,
  deletePengumuman
} = require('../controllers/pengumumanController');

router.post('/', authenticateToken, authorize(['koor_mbkm']), createPengumuman);
router.get('/', getAllPengumuman);
router.get('/:id', getPengumumanById);
router.put('/:id', authenticateToken, authorize(['koor_mbkm']), updatePengumuman);
router.delete('/:id', authenticateToken, authorize(['koor_mbkm']), deletePengumuman);

module.exports = router;
