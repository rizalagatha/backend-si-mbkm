const express = require('express');
const router = express.Router();
const {
  createBerkasPenilaian,
  getAllBerkasPenilaian,
  getBerkasPenilaianById,
  updateBerkasPenilaian,
  deleteBerkasPenilaian
} = require('../controllers/berkasPenilaianController');

router.post('/', createBerkasPenilaian);
router.get('/', getAllBerkasPenilaian);
router.get('/:id', getBerkasPenilaianById);
router.put('/:id', updateBerkasPenilaian);
router.delete('/:id', deleteBerkasPenilaian);

module.exports = router;
