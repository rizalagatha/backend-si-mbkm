const Logbook = require('../models/logbook');
const Mahasiswa = require('../models/mahasiswa');

// Mendapatkan semua logbook
exports.getAllLogbooks = async (req, res) => {
  try {
    const logbooks = await Logbook.findAll({
      include: [{ model: Mahasiswa, attributes: ['nama_mahasiswa'] }],
    });
    res.status(200).json(logbooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan logbook berdasarkan ID
exports.getLogbookById = async (req, res) => {
  try {
    const logbook = await Logbook.findByPk(req.params.id, {
      include: [{ model: Mahasiswa, attributes: ['nama_mahasiswa'] }],
    });
    if (!logbook) {
      return res.status(404).json({ message: 'Logbook not found' });
    }
    res.status(200).json(logbook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat logbook baru
exports.createLogbook = async (req, res) => {
    const { judul, subjek, NIM } = req.body;
    const file = req.file ? req.file.filename : null;
  
    try {
      const logbook = await Logbook.create({
        judul,
        subjek,
        nama_file: file, // Menyimpan nama file jika ada
        NIM,
      });
      res.status(201).json(logbook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Mengupdate logbook berdasarkan ID
exports.updateLogbook = async (req, res) => {
  const { id } = req.params;
  const { judul, subjek, nama_file, NIM } = req.body;
  try {
    const logbook = await Logbook.findByPk(id);
    if (!logbook) {
      return res.status(404).json({ message: 'Logbook not found' });
    }
    await logbook.update({
      judul,
      subjek,
      nama_file,
      NIM,
    });
    res.status(200).json(logbook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus logbook berdasarkan ID
exports.deleteLogbook = async (req, res) => {
  const { id } = req.params;
  try {
    const logbook = await Logbook.findByPk(id);
    if (!logbook) {
      return res.status(404).json({ message: 'Logbook not found' });
    }
    await logbook.destroy();
    res.status(204).json({ message: 'Logbook deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
