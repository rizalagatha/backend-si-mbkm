const express = require('express');
const router = express.Router();
const {
  createMahasiswa,
  getAllMahasiswa,
  getMahasiswaByNIM,
  updateMahasiswa,
  deleteMahasiswa
} = require('../controllers/mahasiswaController');

router.post('/', createMahasiswa);
router.get('/', getAllMahasiswa);
router.get('/:NIM', getMahasiswaByNIM);
router.put('/:NIM', updateMahasiswa);
router.delete('/:NIM', deleteMahasiswa);

module.exports = router;
