const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/auth');
const {
  getAdminSiap,
  createAdminSiap,
  updateAdminSiap,
  deleteAdminSiap
} = require('../controllers/adminSiapController');

router.get('/', getAdminSiap);
router.post('/',authenticateToken, authorize(['koor_mbkm']), createAdminSiap);
router.put('/:NIP_admin_siap', authenticateToken, authorize(['koor_mbkm']), updateAdminSiap);
router.delete('/:NIP_admin_siap', authenticateToken, authorize(['koor_mbkm']), deleteAdminSiap);

module.exports = router;
