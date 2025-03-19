const AdminSiap = require('../models/adminSiap');

// Get All Admin Siap
const getAdminSiap = async (req, res) => {
  try {
    const admins = await AdminSiap.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdminSiapByNIP = async (req, res) => {
  const { NIP_admin_siap } = req.params;
  try {
    // Pastikan NIP dikirim sebagai string
    if (!NIP_admin_siap || typeof NIP_admin_siap !== 'string') {
      return res.status(400).json({ error: 'NIP harus berupa string yang valid.' });
    }

    const admin = await AdminSiap.findOne({ where: { NIP_admin_siap } });

    if (!admin) {
      return res.status(404).json({ error: `Admin dengan NIP ${NIP_admin_siap} tidak ditemukan.` });
    }

    res.status(200).json({ message: `Data Admin SIAP untuk NIP ${NIP_admin_siap} berhasil diambil.`, data: admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create Admin Siap
const createAdminSiap = async (req, res) => {
  const { NIP_admin_siap, nama_admin_siap } = req.body;
  
  // Validasi input
  if (!NIP_admin_siap || typeof NIP_admin_siap !== 'string') {
    return res.status(400).json({ error: 'NIP harus berupa string.' });
  }

  try {
    const admin = await AdminSiap.create({ NIP_admin_siap, nama_admin_siap });
    res.status(201).json({ message: 'Berhasil membuat data Admin SIAP', data: admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Admin Siap
const updateAdminSiap = async (req, res) => {
  const { NIP_admin_siap } = req.params;
  const { nama_admin_siap } = req.body;
  try {
    await AdminSiap.update({ nama_admin_siap }, { where: { NIP_admin_siap } });
    res.status(200).json({ message: 'Data Admin SIAP berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Admin Siap
const deleteAdminSiap = async (req, res) => {
  const { NIP_admin_siap } = req.params;
  try {
    await AdminSiap.destroy({ where: { NIP_admin_siap } });
    res.status(200).json({ message: 'Data Admin SIAP berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdminSiap,
  getAdminSiapByNIP,
  createAdminSiap,
  updateAdminSiap,
  deleteAdminSiap
};
