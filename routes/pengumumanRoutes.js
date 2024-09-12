const express = require('express');
const router = express.Router();
const {
  createPengumuman,
  getAllPengumuman,
  getPengumumanById,
  updatePengumuman,
  deletePengumuman
} = require('../controllers/pengumumanController');

router.post('/', createPengumuman);
router.get('/', getAllPengumuman);
router.get('/:id', getPengumumanById);
router.put('/:id', updatePengumuman);
router.delete('/:id', deletePengumuman);

module.exports = router;
