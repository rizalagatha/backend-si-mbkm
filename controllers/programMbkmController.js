const ProgramMbkm = require('../models/programMbkm');
const Categories = require('../models/categories');
const Mahasiswa = require('../models/mahasiswa');

// Create a new Program MBKM
const createProgramMbkm = async (req, res) => {
  const { company, deskripsi, role, status, date, category_id } = req.body;
  try {
    console.log(`Received category_id: ${category_id}`); // Debugging

    const category = await Categories.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const programMbkm = await ProgramMbkm.create({
      company,
      deskripsi,
      role,
      status,
      date,
      category_id, // Pastikan ini
    });

    res.status(201).json({ message: 'Program MBKM created successfully', programMbkm });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Programs MBKM
const getAllProgramMbkm = async (req, res) => {
  try {
    // Sertakan relasi kategori saat mengambil data Program MBKM
    const programs = await ProgramMbkm.findAll({
      include: {
        model: Categories, // Include category data
        attributes: ['id', 'name'], // Ambil id dan name dari Category
      },
    });
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Program MBKM by ID
const getProgramMbkmById = async (req, res) => {
  const { id } = req.params;
  try {
    const programMbkm = await ProgramMbkm.findByPk(id, {
      include: {
        model: Categories, // Sertakan kategori pada hasil query
        attributes: ['id', 'name'],
      },
    });
    if (programMbkm) {
      res.status(200).json(programMbkm);
    } else {
      res.status(404).json({ message: 'Program MBKM not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProgramMbkmByNim = async (req, res) => {
  const { NIM } = req.params;
  try {
    const programs = await ProgramMbkm.findAll({
      include: {
        model: Mahasiswa,
        as: 'mahasiswa', // Pastikan nama alias sesuai dengan asosiasi
        where: { NIM },
      },
    });

    if (programs.length > 0) {
      res.status(200).json(programs);
    } else {
      res.status(404).json({ message: 'Program tidak ditemukan untuk NIM tersebut' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update a Program MBKM
const updateProgramMbkm = async (req, res) => {
  const { id } = req.params;
  const { company, deskripsi, role, status, date, category_id } = req.body;

  try {
    // Cek apakah category_id valid sebelum update
    const categories = await Categories.findByPk(category_id);
    if (!categories) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update Program MBKM
    const [updated] = await ProgramMbkm.update(
      { company, deskripsi, role, status, date, categoryId: category_id }, // Sertakan categoryId
      { where: { id_program_mbkm: id } }
    );

    if (updated) {
      const updatedProgramMbkm = await ProgramMbkm.findByPk(id, {
        include: {
          model: Categories,
          attributes: ['id', 'name'],
        },
      });
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
  getProgramMbkmByNim,
  updateProgramMbkm,
  deleteProgramMbkm
};