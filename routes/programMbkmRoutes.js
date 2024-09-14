const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  createProgramMbkm,
  getAllProgramMbkm,
  getProgramMbkmById,
  updateProgramMbkm,
  deleteProgramMbkm
} = require('../controllers/programMbkmController');

router.post('/', authenticateToken, authorize(['koor_mbkm']), createProgramMbkm);
router.get('/', getAllProgramMbkm);
router.get('/:id', getProgramMbkmById);
router.put('/:id', authenticateToken, authorize(['koor_mbkm']), updateProgramMbkm);
router.delete('/:id', authenticateToken, authorize(['koor_mbkm']), deleteProgramMbkm);

module.exports = router;
