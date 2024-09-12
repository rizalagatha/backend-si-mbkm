const express = require('express');
const router = express.Router();
const {
  createKoorMbkm,
  getAllKoorMbkm,
  getKoorMbkmByNIP,
  updateKoorMbkm,
  deleteKoorMbkm
} = require('../controllers/koorMbkmController');

router.post('/', createKoorMbkm);
router.get('/', getAllKoorMbkm);
router.get('/:NIP_koor_mbkm', getKoorMbkmByNIP);
router.put('/:NIP_koor_mbkm', updateKoorMbkm);
router.delete('/:NIP_koor_mbkm', deleteKoorMbkm);

module.exports = router;
