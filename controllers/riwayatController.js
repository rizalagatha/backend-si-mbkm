const Riwayat = require('../models/riwayat');
const Mahasiswa = require('../models/mahasiswa');
const ProgramMbkm = require('../models/programMbkm');

// Create a new Riwayat
const createRiwayat = async (req, res) => {
  const { NIM, nilai, nama_berkas, id_program_mbkm } = req.body;
  try {
    // Check if related Mahasiswa and Program MBKM exist
    const mahasiswa = await Mahasiswa.findByPk(NIM);
    const programMbkm = await ProgramMbkm.findByPk(id_program_mbkm);

    if (!mahasiswa || !programMbkm) {
      return res.status(400).json({
        message: 'Related Mahasiswa or Program MBKM not found',
      });
    }

    const riwayat = await Riwayat.create({
      NIM,
      nilai,
      nama_berkas,
      id_program_mbkm,
    });

    res.status(201).json({
      message: 'Riwayat created successfully',
      data: riwayat,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating Riwayat',
      error: error.message,
    });
  }
};

// Get all Riwayat
const getAllRiwayat = async (req, res) => {
  try {
    const riwayat = await Riwayat.findAll({
      include: [
        { model: Mahasiswa, as: 'mahasiswa' },
        { model: ProgramMbkm, as: 'program_mbkm' },
      ],
    });

    res.status(200).json(riwayat);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching Riwayat',
      error: error.message,
    });
  }
};

// Get Riwayat by ID
const getRiwayatById = async (req, res) => {
  const { id } = req.params;
  try {
    const riwayat = await Riwayat.findByPk(id, {
      include: [
        { model: Mahasiswa, as: 'mahasiswa' },
        { model: ProgramMbkm, as: 'program_mbkm' },
      ],
    });

    if (riwayat) {
      res.status(200).json(riwayat);
    } else {
      res.status(404).json({ message: 'Riwayat not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching Riwayat by ID',
      error: error.message,
    });
  }
};

// Get Riwayat by NIM
const getRiwayatByNIM = async (req, res) => {
  const { NIM } = req.params;
  try {
    const riwayat = await Riwayat.findAll({
      where: { NIM },
      include: [
        { model: Mahasiswa, as: 'mahasiswa' },
        { model: ProgramMbkm, as: 'program_mbkm' },
      ],
    });

    if (riwayat.length > 0) {
      res.status(200).json(riwayat);
    } else {
      res.status(404).json({ message: 'No Riwayat found for this NIM' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching Riwayat by NIM',
      error: error.message,
    });
  }
};

// Update a Riwayat
const updateRiwayat = async (req, res) => {
  const { id } = req.params;
  const { NIM, nilai, nama_berkas, id_program_mbkm } = req.body;
  try {
    const [updated] = await Riwayat.update(
      { NIM, nilai, nama_berkas, id_program_mbkm },
      { where: { id_riwayat: id } }
    );

    if (updated) {
      const updatedRiwayat = await Riwayat.findByPk(id);
      res.status(200).json({
        message: 'Riwayat updated successfully',
        data: updatedRiwayat,
      });
    } else {
      res.status(404).json({ message: 'Riwayat not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating Riwayat',
      error: error.message,
    });
  }
};

// Delete a Riwayat
const deleteRiwayat = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Riwayat.destroy({ where: { id_riwayat: id } });
    if (deleted) {
      res.status(200).json({ message: 'Riwayat deleted successfully' });
    } else {
      res.status(404).json({ message: 'Riwayat not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting Riwayat',
      error: error.message,
    });
  }
};

module.exports = {
  createRiwayat,
  getAllRiwayat,
  getRiwayatById,
  getRiwayatByNIM,
  updateRiwayat,
  deleteRiwayat,
};
