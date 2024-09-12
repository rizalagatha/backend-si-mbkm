const express = require('express');
const router = express.Router();
const {
  createKonversiNilai,
  getAllKonversiNilai,
  getKonversiNilaiById,
  updateKonversiNilai,
  deleteKonversiNilai
} = require('../controllers/konversiNilaiController');

router.post('/', createKonversiNilai);
router.get('/', getAllKonversiNilai);
router.get('/:id', getKonversiNilaiById);
router.put('/:id', updateKonversiNilai);
router.delete('/:id', deleteKonversiNilai);

module.exports = router;
