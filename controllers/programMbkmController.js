const ProgramMbkm = require('../models/programMbkm');

// Create a new Program MBKM
const createProgramMbkm = async (req, res) => {
  const { id_program_mbkm, nama_program, deskripsi } = req.body;
  try {
    const programMbkm = await ProgramMbkm.create({
      id_program_mbkm,
      nama_program,
      deskripsi
    });
    res.status(201).json({ message: 'Program MBKM created successfully', programMbkm });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Programs MBKM
const getAllProgramMbkm = async (req, res) => {
  try {
    const programs = await ProgramMbkm.findAll({
      include: Category, // Include category data
    });
    res.status(200).json(programsMbkm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Program MBKM by ID
const getProgramMbkmById = async (req, res) => {
  const { id } = req.params;
  try {
    const programMbkm = await ProgramMbkm.findByPk(id);
    if (programMbkm) {
      res.status(200).json(programMbkm);
    } else {
      res.status(404).json({ message: 'Program MBKM not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Program MBKM
const updateProgramMbkm = async (req, res) => {
  const { id } = req.params;
  const { nama_program, deskripsi } = req.body;
  try {
    const [updated] = await ProgramMbkm.update(
      { nama_program, deskripsi },
      { where: { id_program_mbkm: id } }
    );
    if (updated) {
      const updatedProgramMbkm = await ProgramMbkm.findByPk(id);
      res.status(200).json({ message: 'Program MBKM updated successfully', updatedProgramMbkm });
    } else {
      res.status(404).json({ message: 'Program MBKM not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Program MBKM
const deleteProgramMbkm = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await ProgramMbkm.destroy({ where: { id_program_mbkm: id } });
    if (deleted) {
      res.status(204).json({ message: 'Program MBKM deleted successfully' });
    } else {
      res.status(404).json({ message: 'Program MBKM not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProgramMbkm,
  getAllProgramMbkm,
  getProgramMbkmById,
  updateProgramMbkm,
  deleteProgramMbkm
};
