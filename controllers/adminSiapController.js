const { AdminSiap } = require('../models'); // Import the AdminSiap model

// Get All Admin Siap
const getAdminSiap = async (req, res) => {
  try {
    const admins = await AdminSiap.findAll({
      include: [{ model: User, as: 'user' }] // Including associated 'user' model
    });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Admin Siap by NIP
const getAdminSiapByNIP = async (req, res) => {
  const { NIP_admin_siap } = req.params;
  try {
    const admin = await AdminSiap.findOne({
      where: { NIP_admin_siap },
      include: [{ model: User, as: 'user' }] // Include associated user
    });

    if (!admin) {
      return res.status(404).json({ error: `Admin with NIP ${NIP_admin_siap} not found.` });
    }

    res.status(200).json({ message: `Admin SIAP data for NIP ${NIP_admin_siap} retrieved successfully.`, data: admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Admin Siap
const createAdminSiap = async (req, res) => {
  const { NIP_admin_siap, nama_admin_siap, user_id } = req.body;
  try {
    const admin = await AdminSiap.create({ 
      NIP_admin_siap, 
      nama_admin_siap, 
      user_id 
    });
    res.status(201).json({ message: 'Admin SIAP data successfully created', data: admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Admin Siap
const updateAdminSiap = async (req, res) => {
  const { NIP_admin_siap } = req.params;
  const { nama_admin_siap, user_id } = req.body;
  try {
    const [updated] = await AdminSiap.update({ 
      nama_admin_siap, 
      user_id 
    }, { 
      where: { NIP_admin_siap } 
    });

    if (updated) {
      const updatedAdmin = await AdminSiap.findOne({ where: { NIP_admin_siap } });
      return res.status(200).json({ message: 'Admin SIAP data updated successfully.', data: updatedAdmin });
    }
    throw new Error('Admin SIAP not found.');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Admin Siap
const deleteAdminSiap = async (req, res) => {
  const { NIP_admin_siap } = req.params;
  try {
    const deleted = await AdminSiap.destroy({ where: { NIP_admin_siap } });

    if (deleted) {
      return res.status(200).json({ message: 'Admin SIAP data deleted successfully.' });
    }
    throw new Error('Admin SIAP not found.');
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
