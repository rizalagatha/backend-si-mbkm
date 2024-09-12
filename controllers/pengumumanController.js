const Pengumuman = require('../models/pengumuman');
const KoorMbkm = require('../models/koorMbkm');  // FK ke tabel koor_mbkm

// Create a new Pengumuman
const createPengumuman = async (req, res) => {
  const { judul, isi, tanggal, NIP_koor_mbkm } = req.body;
  try {
    // Check if related Koor MBKM exists
    const koorMbkm = await KoorMbkm.findByPk(NIP_koor_mbkm);
    if (!koorMbkm) {
      return res.status(400).json({ message: 'Koor MBKM not found' });
    }

    const pengumuman = await Pengumuman.create({
      judul,
      isi,
      tanggal,
      NIP_koor_mbkm
    });
    res.status(201).json({ message: 'Pengumuman created successfully', pengumuman });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Pengumuman
const getAllPengumuman = async (req, res) => {
  try {
    const pengumumanList = await Pengumuman.findAll();
    res.status(200).json(pengumumanList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Pengumuman by ID
const getPengumumanById = async (req, res) => {
  const { id } = req.params;
  try {
    const pengumuman = await Pengumuman.findByPk(id);
    if (pengumuman) {
      res.status(200).json(pengumuman);
    } else {
      res.status(404).json({ message: 'Pengumuman not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Pengumuman
const updatePengumuman = async (req, res) => {
  const { id } = req.params;
  const { judul, isi, tanggal, NIP_koor_mbkm } = req.body;
  try {
    const [updated] = await Pengumuman.update(
      { judul, isi, tanggal, NIP_koor_mbkm },
      { where: { id_pengumuman: id } }
    );
    if (updated) {
      const updatedPengumuman = await Pengumuman.findByPk(id);
      res.status(200).json({ message: 'Pengumuman updated successfully', updatedPengumuman });
    } else {
      res.status(404).json({ message: 'Pengumuman not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Pengumuman
const deletePengumuman = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Pengumuman.destroy({ where: { id_pengumuman: id } });
    if (deleted) {
      res.status(204).json({ message: 'Pengumuman deleted successfully' });
    } else {
      res.status(404).json({ message: 'Pengumuman not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPengumuman,
  getAllPengumuman,
  getPengumumanById,
  updatePengumuman,
  deletePengumuman
};
