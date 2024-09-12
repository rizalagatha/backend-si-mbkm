const express = require('express');
const router = express.Router();
const {
  createDosbing,
  getAllDosbing,
  getDosbingByNIP,
  updateDosbing,
  deleteDosbing
} = require('../controllers/dosbingController');

router.post('/', createDosbing);
router.get('/', getAllDosbing);
router.get('/:NIP_dosbing', getDosbingByNIP);
router.put('/:NIP_dosbing', updateDosbing);
router.delete('/:NIP_dosbing', deleteDosbing);

module.exports = router;
