const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Model untuk user
const AdminSiap = require('../models/adminSiap');
const Dosbing = require('../models/dosbing');
const KoorMbkm = require('../models/koorMbkm');
const Mahasiswa = require('../models/mahasiswa');

// Fungsi Login
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Model user
const AdminSiap = require('../models/adminSiap');
const Dosbing = require('../models/dosbing');
const KoorMbkm = require('../models/koorMbkm');
const Mahasiswa = require('../models/mahasiswa');

// Fungsi Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Mencari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.isPasswordValid(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Menentukan informasi tambahan berdasarkan role user
    let additionalInfo = {};
    if (user.role === 'mahasiswa') {
      const mahasiswa = await Mahasiswa.findOne({ where: { userId: user.id } });
      additionalInfo.NIM = mahasiswa.NIM;  // Menambahkan NIM untuk mahasiswa
    } else if (user.role === 'koor_mbkm') {
      const koor = await KoorMbkm.findOne({ where: { userId: user.id } });
      additionalInfo.NIP_koor_mbkm = koor.NIP_koor_mbkm;  // Menambahkan NIP Koordinator MBKM
    } else if (user.role === 'dosbing') {
      const dosbing = await Dosbing.findOne({ where: { userId: user.id } });
      additionalInfo.NIP_dosbing = dosbing.NIP_dosbing;  // Menambahkan NIP Dosbing
    } else if (user.role === 'admin_siap') {
      const adminSiap = await AdminSiap.findOne({ where: { userId: user.id } });
      additionalInfo.NIP_admin_siap = adminSiap.NIP_admin_siap;  // Menambahkan NIP Admin Siap
    }

    // Membuat token JWT dengan menambahkan informasi tambahan
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
        ...additionalInfo,  // Menambahkan NIM/NIP ke dalam payload
      },
      'secretKey', // Secret key untuk menandatangani token
      { expiresIn: '1h' }
    );

    // Mengirimkan response dengan token
    res.json({ token });
  } catch (error) {
    console.error(error);  // Menambahkan log error untuk debugging
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };

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