const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Model untuk user
const AdminSiap = require('../models/adminSiap');
const Dosbing = require('../models/dosbing');
const KoorMbkm = require('../models/koorMbkm');
const Mahasiswa = require('../models/mahasiswa');

// Fungsi Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials: User not found' });
    }

    // Validate the password
    if (!(await user.isPasswordValid(password))) {
      return res.status(401).json({ message: 'Invalid credentials: Wrong password' });
    }

    // Fetch additional data based on role
    let additionalInfo = {};
    switch (user.role) {
      case 'mahasiswa':
        const mahasiswa = await Mahasiswa.findOne({ where: { user_id: user.id } });
        if (mahasiswa) {
          additionalInfo.NIM = mahasiswa.NIM;
        } else {
          return res.status(404).json({ message: 'Mahasiswa data not found' });
        }
        break;

      case 'koor_mbkm':
        const koor = await KoorMbkm.findOne({ where: { user_id: user.id } });
        if (koor) {
          additionalInfo.NIP_koor_mbkm = koor.NIP_koor_mbkm;
        } else {
          return res.status(404).json({ message: 'Koordinator MBKM data not found' });
        }
        break;

      case 'dosbing':
        const dosbing = await Dosbing.findOne({ where: { user_id: user.id } });
        if (dosbing) {
          additionalInfo.NIP_dosbing = dosbing.NIP_dosbing;
        } else {
          return res.status(404).json({ message: 'Dosbing data not found' });
        }
        break;

      case 'admin_siap':
        const adminSiap = await AdminSiap.findOne({ where: { user_id: user.id } });
        if (adminSiap) {
          additionalInfo.NIP_admin_siap = adminSiap.NIP_admin_siap;
        } else {
          return res.status(404).json({ message: 'Admin Siap data not found' });
        }
        break;

      default:
        return res.status(400).json({ message: 'Unknown role' });
    }

    // Generate JWT token with user info and additional data
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
        ...additionalInfo,
      },
      'secretKey',
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};


module.exports = { login };

// Fungsi Register
const register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    NIP_dosbing,
    NIP_admin_siap,
    NIP_koor_mbkm,
    NIM,
    semester,
    id_program_mbkm,
  } = req.body;

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
          user_id: user.id,             // Foreign key ke tabel Users
          NIP_admin_siap,               // NIP untuk Admin Siap
          nama_admin_siap: name,        // Nama Admin Siap
        });
        NIP_or_NIM = NIP_admin_siap;
        break;

      case 'dosbing':
        await Dosbing.create({
          user_id: user.id,             // Foreign key ke tabel Users
          NIP_dosbing,                  // NIP untuk Dosbing
          nama_dosbing: name,           // Nama Dosbing
        });
        NIP_or_NIM = NIP_dosbing;
        break;

      case 'koor_mbkm':
        await KoorMbkm.create({
          user_id: user.id,             // Foreign key ke tabel Users
          NIP_koor_mbkm,                // NIP untuk Koordinator MBKM
          nama_koor_mbkm: name,         // Nama Koordinator MBKM
        });
        NIP_or_NIM = NIP_koor_mbkm;
        break;

      case 'mahasiswa':
        await Mahasiswa.create({
          user_id: user.id,             // Foreign key ke tabel Users
          NIM,                          // NIM untuk Mahasiswa
          nama_mahasiswa: name,         // Nama Mahasiswa
          semester,                     // Semester
          id_program_mbkm,              // Foreign Key ke program_mbkm
          NIP_dosbing,                  // Foreign Key ke dosbing
        });
        NIP_or_NIM = NIM;
        break;
    }

    // Generate JWT dengan informasi tambahan
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email, NIP_or_NIM },
      'secretKey',
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Registration successful', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



module.exports = { login, register };