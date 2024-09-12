const express = require('express');
const router = express.Router();
const {
  createPendaftaranMbkm,
  getAllPendaftaranMbkm,
  getPendaftaranMbkmById,
  updatePendaftaranMbkm,
  deletePendaftaranMbkm
} = require('../controllers/pendaftaranMbkmController');

router.post('/', createPendaftaranMbkm);
router.get('/', getAllPendaftaranMbkm);
router.get('/:id', getPendaftaranMbkmById);
router.put('/:id', updatePendaftaranMbkm);
router.delete('/:id', deletePendaftaranMbkm);

module.exports = router;
