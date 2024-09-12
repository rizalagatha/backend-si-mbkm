const express = require('express');
const router = express.Router();
const {
  createProgramMbkm,
  getAllProgramMbkm,
  getProgramMbkmById,
  updateProgramMbkm,
  deleteProgramMbkm
} = require('../controllers/programMbkmController');

router.post('/', createProgramMbkm);
router.get('/', getAllProgramMbkm);
router.get('/:id', getProgramMbkmById);
router.put('/:id', updateProgramMbkm);
router.delete('/:id', deleteProgramMbkm);

module.exports = router;
