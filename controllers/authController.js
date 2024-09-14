const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Model untuk user

// Fungsi Login
const login = async (req, res) => {
  const { name, email, password } = req.body; // Sesuaikan dengan field login
  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.isPasswordValid(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT berdasarkan role
  const token = jwt.sign({ id: user.id, role: user.role }, 'secretKey', { expiresIn: '1h' });

  res.json({ token });
};

// Fungsi Register
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Daftar role yang valid
  const validRoles = ['koor_mbkm', 'admin_siap', 'dosbing', 'mahasiswa'];

  // Periksa apakah role yang diberikan valid
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await User.create({ name, email, password, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, register };