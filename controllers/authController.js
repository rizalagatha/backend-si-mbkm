const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Model untuk user
const AdminSiap = require('../models/adminSiap');
const Dosbing = require('../models/dosbing');
const KoorMbkm = require('../models/koorMbkm');
const Mahasiswa = require('../models/mahasiswa');

// Fungsi Login
const login = async (req, res) => {
  const { email, password } = req.body; // Sesuaikan dengan field login
  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.isPasswordValid(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Ambil NIP/NIM berdasarkan role pengguna
  let NIP_or_NIM = null;
  if (user.role === 'admin_siap') {
    const admin = await AdminSiap.findOne({ where: { userId: user.id } });
    NIP_or_NIM = admin.NIP_admin_siap;
  } else if (user.role === 'dosbing') {
    const dosbing = await Dosbing.findOne({ where: { userId: user.id } });
    NIP_or_NIM = dosbing.NIP_dosbing;
  } else if (user.role === 'koor_mbkm') {
    const koor = await KoorMbkm.findOne({ where: { userId: user.id } });
    NIP_or_NIM = koor.NIP_koor_mbkm;
  } else if (user.role === 'mahasiswa') {
    const mahasiswa = await Mahasiswa.findOne({ where: { userId: user.id } });
    NIP_or_NIM = mahasiswa.NIM;
  }

  // Generate JWT dengan menambahkan email dan NIP/NIM
  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email, NIP_or_NIM },
    'secretKey',
    { expiresIn: '1d' }
  );

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
    let NIP_or_NIM = null;
    switch (role) {
      case 'admin_siap':
        await AdminSiap.create({
          NIP_admin_siap,  // NIP untuk Admin Siap
          nama_admin_siap: name,
        });
        NIP_or_NIM = NIP_admin_siap;
        break;
      case 'dosbing':
        await Dosbing.create({
          NIP_dosbing,  // NIP untuk Dosbing
          nama_dosbing: name,
        });
        NIP_or_NIM = NIP_dosbing;
        break;
      case 'koor_mbkm':
        await KoorMbkm.create({
          NIP_koor_mbkm,  // NIP untuk Koordinator MBKM
          nama_koor_mbkm: name,
        });
        NIP_or_NIM = NIP_koor_mbkm;
        break;
      case 'mahasiswa':
        await Mahasiswa.create({
          NIM,                          // Primary Key di tabel mahasiswa
          nama_mahasiswa: name,         // Nama mahasiswa dari input
          semester,                     // Semester dari input
          id_program_mbkm,              // Foreign Key ke program_mbkm
          NIP_dosbing                   // Foreign Key ke dosbing
        });
        NIP_or_NIM = NIM;
        break;
    }

    // Generate JWT dengan menambahkan email dan NIP/NIM
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email, NIP_or_NIM },
      'secretKey',
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Registration successful', user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { login, register };