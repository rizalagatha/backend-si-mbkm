const express = require('express');
const router = express.Router();
const {
  getAdminSiap,
  createAdminSiap,
  updateAdminSiap,
  deleteAdminSiap
} = require('../controllers/adminSiapController');

router.get('/', getAdminSiap);
router.post('/', createAdminSiap);
router.put('/:NIP_admin_siap', updateAdminSiap);
router.delete('/:NIP_admin_siap', deleteAdminSiap);

module.exports = router;
