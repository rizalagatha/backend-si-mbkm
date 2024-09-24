const Mahasiswa = require('../models/mahasiswa');

// Create a new Mahasiswa
const createMahasiswa = async (req, res) => {
  const { NIM, nama_mahasiswa, semester, id_program_mbkm, NIP_dosbing } = req.body;
  try {
    const mahasiswa = await Mahasiswa.create({
      NIM,
      nama_mahasiswa,
      semester,
      id_program_mbkm,
      NIP_dosbing
    });
    res.status(201).json({ message: 'Mahasiswa created successfully', mahasiswa });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Mahasiswa
const getAllMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findAll({
    });
    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Mahasiswa by NIM
const getMahasiswaByNIM = async (req, res) => {
  const { NIM } = req.params;
  try {
    const mahasiswa = await Mahasiswa.findByPk(NIM);
    if (mahasiswa) {
      res.status(200).json(mahasiswa);
    } else {
      res.status(404).json({ message: 'Mahasiswa not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Mahasiswa
const updateMahasiswa = async (req, res) => {
  const { NIM } = req.params;
  const { nama_mahasiswa, semester, id_program_mbkm, NIP_dosbing } = req.body;
  try {
    const [updated] = await Mahasiswa.update(
      { nama_mahasiswa, semester, id_program_mbkm, NIP_dosbing },
      { where: { NIM } }
    );
    if (updated) {
      const updatedMahasiswa = await Mahasiswa.findByPk(NIM);
      res.status(200).json({ message: 'Mahasiswa updated successfully', updatedMahasiswa });
    } else {
      res.status(404).json({ message: 'Mahasiswa not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Mahasiswa
const deleteMahasiswa = async (req, res) => {
  const { NIM } = req.params;
  try {
    const deleted = await Mahasiswa.destroy({ where: { NIM } });
    if (deleted) {
      res.status(204).json({ message: 'Mahasiswa deleted successfully' });
    } else {
      res.status(404).json({ message: 'Mahasiswa not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMahasiswa,
  getAllMahasiswa,
  getMahasiswaByNIM,
  updateMahasiswa,
  deleteMahasiswa
};
