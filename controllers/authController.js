  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');
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
        { expiresIn: '24h' }
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

    const validRoles = ['koor_mbkm', 'admin_siap', 'dosbing', 'mahasiswa'];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    try {
      // Simpan user ke tabel Users
      const user = await User.create({ name, email, password, role });

      // Simpan data ke tabel terkait berdasarkan role
      switch (role) {
        case 'admin_siap':
          await AdminSiap.create({
            user_id: user.id,             // user_id otomatis dari user.id
            NIP_admin_siap,
            nama_admin_siap: name,
          });
          break;

        case 'dosbing':
          await Dosbing.create({
            user_id: user.id,             // user_id otomatis dari user.id
            NIP_dosbing,
            nama_dosbing: name,
          });
          break;

        case 'koor_mbkm':
          await KoorMbkm.create({
            user_id: user.id,             // user_id otomatis dari user.id
            NIP_koor_mbkm,
            nama_koor_mbkm: name,
          });
          break;

        case 'mahasiswa':
          await Mahasiswa.create({
            user_id: user.id,             // user_id otomatis dari user.id
            NIM,
            nama_mahasiswa: name,
            semester,
            id_program_mbkm,
            NIP_dosbing,
          });
          break;
      }

      // Buat token JWT
      const token = jwt.sign(
        { id: user.id, role: user.role, email: user.email },
        'secretKey',
        { expiresIn: '24h' }
      );

      res.status(201).json({ message: 'Registration successful', user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  // Fungsi untuk memperbarui password
  const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
  
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Unauthorized: Invalid user token' });
      }
  
      const userId = req.user.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect old password' });
      }
  
      if (newPassword.length < 8) {
        return res.status(400).json({ message: 'New password must be at least 8 characters long' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  module.exports = { login, register, updatePassword };