const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Model untuk user
const AdminSiap = require('../models/adminSiap');
const Dosbing = require('../models/dosbing');
const KoorMbkm = require('../models/koorMbkm');
const Mahasiswa = require('../models/mahasiswa');

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
  const { name, email, password, role, NIP_dosbing, NIP_admin_siap, NIP_koor_mbkm, NIM, semester, id_program_mbkm } = req.body;

  // Daftar role yang valid
  const validRoles = ['koor_mbkm', 'admin_siap', 'dosbing', 'mahasiswa'];

  // Periksa apakah role yang diberikan valid
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    // Simpan ke tabel User
    const user = await User.create({ name, email, password, role });

    // Simpan data berdasarkan role
    switch (role) {
      case 'admin_siap':
        await AdminSiap.create({
          NIP_admin_siap: NIP_admin_siap,  // NIP untuk Admin Siap
          nama_admin_siap: name,
        });
        break;
      case 'dosbing':
        await Dosbing.create({
          NIP_dosbing: NIP_dosbing,  // NIP untuk Dosbing
          nama_dosbing: name,
        });
        break;
      case 'koor_mbkm':
        await KoorMbkm.create({
          NIP_koor_mbkm: NIP_koor_mbkm,  // NIP untuk Koordinator MBKM
          nama_koor_mbkm: name,
        });
        break;
      case 'mahasiswa':
        await Mahasiswa.create({
          NIM,                          // Primary Key di tabel mahasiswa
          nama_mahasiswa: name,         // Nama mahasiswa dari input
          semester,                     // Semester dari input
          id_program_mbkm,              // Foreign Key ke program_mbkm
          NIP_dosbing                   // Foreign Key ke dosbing
        });
        break;
    }

    res.status(201).json({ message: 'Registration successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, register };