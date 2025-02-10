const MatkulKnvrs = require('../models/matkulKnvrs');

// Get All Matkul Konversi
const getAllMatkulKnvrs = async (req, res) => {
  try {
    const matkulList = await MatkulKnvrs.findAll();
    res.status(200).json(matkulList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Matkul Konversi by ID
const getMatkulKnvrsById = async (req, res) => {
  const { id_matkul_knvrs } = req.params;
  try {
    const matkul = await MatkulKnvrs.findOne({ where: { id_matkul_knvrs } });

    if (!matkul) {
      return res.status(404).json({ error: `Matkul dengan ID ${id_matkul_knvrs} tidak ditemukan.` });
    }

    res.status(200).json(matkul);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Matkul Konversi
const createMatkulKnvrs = async (req, res) => {
  const { nama_matkul, kode_matkul, sks, jenis_matkul } = req.body;

  // Validasi jenis_matkul
  const allowedTypes = ['pilihan_ganjil', 'pilihan_genap', 'wajib'];
  if (!allowedTypes.includes(jenis_matkul)) {
    return res.status(400).json({ error: `Jenis matkul harus salah satu dari: ${allowedTypes.join(', ')}` });
  }

  try {
    const matkul = await MatkulKnvrs.create({ nama_matkul, kode_matkul, sks, jenis_matkul });
    res.status(201).json({ message: 'Matkul Konversi berhasil dibuat', data: matkul });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Matkul Konversi
const updateMatkulKnvrs = async (req, res) => {
  const { id_matkul_knvrs } = req.params;
  const { nama_matkul, kode_matkul, sks, jenis_matkul } = req.body;

  const allowedTypes = ['pilihan_ganjil', 'pilihan_genap', 'wajib'];
  if (jenis_matkul && !allowedTypes.includes(jenis_matkul)) {
    return res.status(400).json({ error: `Jenis matkul harus salah satu dari: ${allowedTypes.join(', ')}` });
  }

  try {
    const [updated] = await MatkulKnvrs.update(
      { nama_matkul, kode_matkul, sks, jenis_matkul },
      { where: { id_matkul_knvrs } }
    );

    if (!updated) {
      return res.status(404).json({ error: `Matkul dengan ID ${id_matkul_knvrs} tidak ditemukan.` });
    }

    res.status(200).json({ message: 'Data Matkul Konversi berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Matkul Konversi
const deleteMatkulKnvrs = async (req, res) => {
  const { id_matkul_knvrs } = req.params;
  try {
    const deleted = await MatkulKnvrs.destroy({ where: { id_matkul_knvrs } });

    if (!deleted) {
      return res.status(404).json({ error: `Matkul dengan ID ${id_matkul_knvrs} tidak ditemukan.` });
    }

    res.status(200).json({ message: 'Matkul Konversi berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMatkulKnvrs,
  getMatkulKnvrsById,
  createMatkulKnvrs,
  updateMatkulKnvrs,
  deleteMatkulKnvrs
};
