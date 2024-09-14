const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Model untuk user

// Fungsi Login
const login = async (req, res) => {
  const { NIP, password } = req.body; // Sesuaikan dengan field login
  const user = await User.findOne({ where: { NIP } });

  if (!user || !(await user.isPasswordValid(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT berdasarkan role
  const token = jwt.sign({ id: user.id, role: user.role }, 'secretKey', { expiresIn: '1h' });

  res.json({ token });
};

// Fungsi Register
const register = async (req, res) => {
  const { NIP, password, role } = req.body; // User bisa memilih role (koor_mbkm, admin_siap, dosbing, mahasiswa)
  try {
    const user = await User.create({ NIP, password, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, register };