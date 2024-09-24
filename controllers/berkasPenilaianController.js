const BerkasPenilaian = require('../models/berkasPenilaian');

// Create a new BerkasPenilaian
const createBerkasPenilaian = async (req, res) => {
  const { id_pendaftaran_mbkm, id_konversi_nilai, nama_berkas } = req.body;
  try {
    const berkasPenilaian = await BerkasPenilaian.create({
      id_pendaftaran_mbkm,
      id_konversi_nilai,
      nama_berkas
    });
    res.status(201).json({ message: 'Berhasil membuat Berkas Penilaian', berkasPenilaian });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all BerkasPenilaian
const getAllBerkasPenilaian = async (req, res) => {
  try {
    const berkasPenilaian = await BerkasPenilaian.findAll();
    res.status(200).json(berkasPenilaian);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a BerkasPenilaian by ID
const getBerkasPenilaianById = async (req, res) => {
  const { id } = req.params;
  try {
    const berkasPenilaian = await BerkasPenilaian.findByPk(id);
    if (berkasPenilaian) {
      res.status(200).json(berkasPenilaian);
    } else {
      res.status(404).json({ message: 'Berkas Penilaian tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a BerkasPenilaian
const updateBerkasPenilaian = async (req, res) => {
  const { id } = req.params;
  const { id_pendaftaran_mbkm, id_konversi_nilai, nama_berkas } = req.body;
  try {
    const [updated] = await BerkasPenilaian.update(
      { id_pendaftaran_mbkm, id_konversi_nilai, nama_berkas },
      { where: { id_berkas_penilaian: id } }
    );
    if (updated) {
      const updatedBerkasPenilaian = await BerkasPenilaian.findByPk(id);
      res.status(200).json({ message: 'Berkas Penilaian berhasil diperbarui', updatedBerkasPenilaian });
    } else {
      res.status(404).json({ message: 'Berkas Penilaian tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a BerkasPenilaian
const deleteBerkasPenilaian = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await BerkasPenilaian.destroy({ where: { id_berkas_penilaian: id } });
    if (deleted) {
      res.status(204).json({ message: 'Berkas Penilaian berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Berkas Penilaian tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBerkasPenilaian,
  getAllBerkasPenilaian,
  getBerkasPenilaianById,
  updateBerkasPenilaian,
  deleteBerkasPenilaian
};
