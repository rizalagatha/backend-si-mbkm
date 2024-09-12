const express = require('express');
const router = express.Router();
const {
  createPendaftaranAkun,
  getAllPendaftaranAkun,
  getPendaftaranAkunById,
  updatePendaftaranAkun,
  deletePendaftaranAkun
} = require('../controllers/pendaftaranAkunController');

router.post('/', createPendaftaranAkun);
router.get('/', getAllPendaftaranAkun);
router.get('/:id', getPendaftaranAkunById);
router.put('/:id', updatePendaftaranAkun);
router.delete('/:id', deletePendaftaranAkun);

module.exports = router;
