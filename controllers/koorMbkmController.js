const KoorMbkm = require('../models/koorMbkm');

// Create a new KoorMbkm
const createKoorMbkm = async (req, res) => {
  const { NIP_koor_mbkm, nama_koor_mbkm } = req.body;
  try {
    const koorMbkm = await KoorMbkm.create({
      NIP_koor_mbkm,
      nama_koor_mbkm
    });
    res.status(201).json({ message: 'Koor Mbkm created successfully', koorMbkm });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all KoorMbkm
const getAllKoorMbkm = async (req, res) => {
  try {
    const koorMbkm = await KoorMbkm.findAll();
    res.status(200).json(koorMbkm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a KoorMbkm by NIP
const getKoorMbkmByNIP = async (req, res) => {
  const { NIP_koor_mbkm } = req.params;
  try {
    const koorMbkm = await KoorMbkm.findByPk(NIP_koor_mbkm);
    if (koorMbkm) {
      res.status(200).json(koorMbkm);
    } else {
      res.status(404).json({ message: 'Koor Mbkm not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a KoorMbkm
const updateKoorMbkm = async (req, res) => {
  const { NIP_koor_mbkm } = req.params;
  const { nama_koor_mbkm } = req.body;
  try {
    const [updated] = await KoorMbkm.update(
      { nama_koor_mbkm },
      { where: { NIP_koor_mbkm } }
    );
    if (updated) {
      const updatedKoorMbkm = await KoorMbkm.findByPk(NIP_koor_mbkm);
      res.status(200).json({ message: 'Koor Mbkm updated successfully', updatedKoorMbkm });
    } else {
      res.status(404).json({ message: 'Koor Mbkm not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a KoorMbkm
const deleteKoorMbkm = async (req, res) => {
  const { NIP_koor_mbkm } = req.params;
  try {
    const deleted = await KoorMbkm.destroy({ where: { NIP_koor_mbkm } });
    if (deleted) {
      res.status(204).json({ message: 'Koor Mbkm deleted successfully' });
    } else {
      res.status(404).json({ message: 'Koor Mbkm not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createKoorMbkm,
  getAllKoorMbkm,
  getKoorMbkmByNIP,
  updateKoorMbkm,
  deleteKoorMbkm
};
