const KonversiNilai = require('../models/konversiNilai');
const Dosbing = require('../models/dosbing');  // FK ke tabel admin_siap
const BerkasPenilaian = require('../models/berkasPenilaian');  // FK ke tabel berkas_penilaian

// Create a new KonversiNilai
const createKonversiNilai = async (req, res) => {
  const { NIP_dosbing, nama_berkas, nilai_akhir, status } = req.body;
  try {
    const konversiNilai = await KonversiNilai.create({
      NIP_dosbing,
      nilai_akhir,
      nama_berkas,
      status
    });
    res.status(201).json({ message: 'Konversi Nilai created successfully', konversiNilai });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all KonversiNilai
const getAllKonversiNilai = async (req, res) => {
  try {
    const konversiNilai = await KonversiNilai.findAll();
    res.status(200).json(konversiNilai);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a KonversiNilai by ID
const getKonversiNilaiById = async (req, res) => {
  const { id } = req.params;
  try {
    const konversiNilai = await KonversiNilai.findByPk(id);
    if (konversiNilai) {
      res.status(200).json(konversiNilai);
    } else {
      res.status(404).json({ message: 'Konversi Nilai not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a KonversiNilai
const updateKonversiNilai = async (req, res) => {
  const { id } = req.params;
  const { NIP_dosbing, nama_berkas, nilai_akhir, status } = req.body;
  try {
    const [updated] = await KonversiNilai.update(
      { NIP_dosbing, nama_berkas, nilai_akhir, status },
      { where: { id_konversi_nilai: id } }
    );
    if (updated) {
      const updatedKonversiNilai = await KonversiNilai.findByPk(id);
      res.status(200).json({ message: 'Konversi Nilai updated successfully', updatedKonversiNilai });
    } else {
      res.status(404).json({ message: 'Konversi Nilai not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a KonversiNilai
const deleteKonversiNilai = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await KonversiNilai.destroy({ where: { id_konversi_nilai: id } });
    if (deleted) {
      res.status(204).json({ message: 'Konversi Nilai deleted successfully' });
    } else {
      res.status(404).json({ message: 'Konversi Nilai not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createKonversiNilai,
  getAllKonversiNilai,
  getKonversiNilaiById,
  updateKonversiNilai,
  deleteKonversiNilai
};
