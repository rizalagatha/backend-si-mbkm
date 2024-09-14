const express = require('express');
const { login, register } = require('../controllers/authController');
const router = express.Router();

// Rute untuk login
router.post('/login', login);

// Rute untuk register
router.post('/register', register);

module.exports = router;
