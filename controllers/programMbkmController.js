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
      waktu_pelaksanaan,
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
    const programs = await ProgramMbkm.findAll({
      include: [
        {
          model: Categories,
          as: 'category', // Alias harus sesuai dengan yang didefinisikan dalam model
        },
        {
          model: Mahasiswa,
          as: 'mahasiswa', // Alias harus sesuai dengan yang didefinisikan dalam model
        },
      ],
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
    const program = await ProgramMbkm.findByPk(id, {
      include: [
        {
          model: Categories,
          as: 'category', // Sesuai dengan alias yang digunakan dalam asosiasi
        },
        {
          model: Mahasiswa,
          as: 'mahasiswa', // Sesuai dengan alias yang digunakan dalam asosiasi
        },
      ],
    });

    if (!program) {
      return res.status(404).json({ message: 'Program MBKM not found' });
    }

    res.status(200).json(program);
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
    // Validasi apakah category_id ada
    const category = await Categories.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update data Program MBKM
    const [updated] = await ProgramMbkm.update(
      { company, deskripsi, role, status, date, categoryId: category_id },
      { where: { id_program_mbkm: id } }
    );

    if (updated) {
      // Ambil data yang baru diperbarui dengan include alias yang benar
      const updatedProgramMbkm = await ProgramMbkm.findByPk(id, {
        include: {
          model: Categories,
          as: 'category', // Alias yang digunakan pada asosiasi
          attributes: ['id', 'name'], // Atribut yang ingin ditampilkan
        },
      });
      return res.status(200).json({ message: 'Program MBKM updated successfully', updatedProgramMbkm });
    }

    res.status(404).json({ message: 'Program MBKM not found' });
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