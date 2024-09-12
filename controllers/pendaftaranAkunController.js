const PendaftaranAkun = require('../models/pendaftaranAkun');
const Mahasiswa = require('../models/mahasiswa');  // FK ke tabel mahasiswa
const KoorMbkm = require('../models/koorMbkm');    // FK ke tabel koor_mbkm

// Create a new PendaftaranAkun
const createPendaftaranAkun = async (req, res) => {
  const { id_pendaftaran_akun, NIM, NIP_koor_mbkm, tanggal } = req.body;
  try {
    const pendaftaranAkun = await PendaftaranAkun.create({
      id_pendaftaran_akun,
      NIM,
      NIP_koor_mbkm,
      tanggal
    });
    res.status(201).json({ message: 'Pendaftaran Akun created successfully', pendaftaranAkun });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all PendaftaranAkun
const getAllPendaftaranAkun = async (req, res) => {
  try {
    const pendaftaranAkun = await PendaftaranAkun.findAll();
    res.status(200).json(pendaftaranAkun);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a PendaftaranAkun by ID
const getPendaftaranAkunById = async (req, res) => {
  const { id } = req.params;
  try {
    const pendaftaranAkun = await PendaftaranAkun.findByPk(id);
    if (pendaftaranAkun) {
      res.status(200).json(pendaftaranAkun);
    } else {
      res.status(404).json({ message: 'Pendaftaran Akun not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a PendaftaranAkun
const updatePendaftaranAkun = async (req, res) => {
  const { id } = req.params;
  const { NIM, NIP_koor_mbkm, tanggal } = req.body;
  try {
    const [updated] = await PendaftaranAkun.update(
      { NIM, NIP_koor_mbkm, tanggal },
      { where: { id_pendaftaran_akun: id } }
    );
    if (updated) {
      const updatedPendaftaranAkun = await PendaftaranAkun.findByPk(id);
      res.status(200).json({ message: 'Pendaftaran Akun updated successfully', updatedPendaftaranAkun });
    } else {
      res.status(404).json({ message: 'Pendaftaran Akun not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a PendaftaranAkun
const deletePendaftaranAkun = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await PendaftaranAkun.destroy({ where: { id_pendaftaran_akun: id } });
    if (deleted) {
      res.status(204).json({ message: 'Pendaftaran Akun deleted successfully' });
    } else {
      res.status(404).json({ message: 'Pendaftaran Akun not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPendaftaranAkun,
  getAllPendaftaranAkun,
  getPendaftaranAkunById,
  updatePendaftaranAkun,
  deletePendaftaranAkun
};
