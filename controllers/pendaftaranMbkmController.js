const PendaftaranMbkm = require('../models/pendaftaranMbkm');
const Mahasiswa = require('../models/mahasiswa');  // FK ke tabel mahasiswa
const ProgramMbkm = require('../models/programMbkm'); // FK ke tabel program_mbkm

// Create a new PendaftaranMbkm
const createPendaftaranMbkm = async (req, res) => {
  const { id_pendaftaran_mbkm, NIM, tanggal, id_program_mbkm, status } = req.body;
  try {
    // Check if related records exist
    const mahasiswa = await Mahasiswa.findByPk(NIM);
    const programMbkm = await ProgramMbkm.findByPk(id_program_mbkm);

    if (!mahasiswa || !dosbing || !programMbkm) {
      return res.status(400).json({
        message: 'Related Mahasiswa, Dosen Pembimbing, or Program MBKM not found',
      });
    }

    const pendaftaranMbkm = await PendaftaranMbkm.create({
      id_pendaftaran_mbkm,
      NIM,
      tanggal,
      id_program_mbkm,
      status,
    });

    res.status(201).json({
      message: 'Pendaftaran MBKM created successfully',
      data: pendaftaranMbkm,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Pendaftaran MBKM', error: error.message });
  }
};

// Get all PendaftaranMbkm
const getAllPendaftaranMbkm = async (req, res) => {
  try {
    const pendaftaranMbkm = await PendaftaranMbkm.findAll();
    res.status(200).json(pendaftaranMbkm);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Pendaftaran MBKM', error: error.message });
  }
};

// Get a PendaftaranMbkm by ID
const getPendaftaranMbkmById = async (req, res) => {
  const { id } = req.params;
  try {
    const pendaftaranMbkm = await PendaftaranMbkm.findByPk(id);
    if (pendaftaranMbkm) {
      res.status(200).json(pendaftaranMbkm);
    } else {
      res.status(404).json({ message: 'Pendaftaran MBKM not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Pendaftaran MBKM', error: error.message });
  }
};

// Get PendaftaranMbkm by NIM
const getPendaftaranMbkmByNIM = async (req, res) => {
  const { NIM } = req.params;
  try {
    const pendaftaranMbkm = await PendaftaranMbkm.findAll({
      where: { NIM },
    });

    if (pendaftaranMbkm.length > 0) {
      res.status(200).json(pendaftaranMbkm);
    } else {
      res.status(404).json({ message: 'No Pendaftaran MBKM found for this NIM' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Pendaftaran MBKM by NIM', error: error.message });
  }
};

// Update a PendaftaranMbkm
const updatePendaftaranMbkm = async (req, res) => {
  const { id } = req.params;
  const { NIM, tanggal, id_program_mbkm, status } = req.body;
  try {
    const [updated] = await PendaftaranMbkm.update(
      { NIM, tanggal, id_program_mbkm, status },
      { where: { id_pendaftaran_mbkm: id } }
    );
    if (updated) {
      const updatedPendaftaranMbkm = await PendaftaranMbkm.findByPk(id);
      res.status(200).json({ message: 'Pendaftaran MBKM updated successfully', data: updatedPendaftaranMbkm });
    } else {
      res.status(404).json({ message: 'Pendaftaran MBKM not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating Pendaftaran MBKM', error: error.message });
  }
};

// Delete a PendaftaranMbkm
const deletePendaftaranMbkm = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await PendaftaranMbkm.destroy({ where: { id_pendaftaran_mbkm: id } });
    if (deleted) {
      res.status(200).json({ message: 'Pendaftaran MBKM deleted successfully' });
    } else {
      res.status(404).json({ message: 'Pendaftaran MBKM not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Pendaftaran MBKM', error: error.message });
  }
};

module.exports = {
  createPendaftaranMbkm,
  getAllPendaftaranMbkm,
  getPendaftaranMbkmById,
  getPendaftaranMbkmByNIM,
  updatePendaftaranMbkm,
  deletePendaftaranMbkm,
};
