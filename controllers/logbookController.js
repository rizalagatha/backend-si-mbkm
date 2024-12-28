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

exports.getLogbooksByNIM = async (req, res) => {
  try {
    const { NIM } = req.params; // Ambil NIM dari parameter URL
    console.log('NIM received:', NIM);

    const logbooks = await Logbook.findAll({
      where: { NIM }, // Cari berdasarkan kolom NIM
      include: [{ model: Mahasiswa, attributes: ['nama_mahasiswa'] }],
    });

    if (!logbooks || logbooks.length === 0) {
      return res.status(404).json({ message: 'Logbook not found' });
    }

    return res.status(200).json(logbooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


// Membuat logbook baru
exports.createLogbook = async (req, res) => {
  try {
    const { judul, subjek, status, jenis } = req.body;
    const NIM = req.user?.NIM || req.body.NIM; // Ambil dari token atau body

    if (!NIM) {
      return res.status(400).json({ message: 'NIM is required' });
    }

    const newLogbook = await Logbook.create({
      judul,
      subjek,
      nama_file: req.file?.path || null,
      NIM,
      status,
      jenis,
    });

    return res.status(201).json({ message: 'Logbook created successfully', data: newLogbook });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create logbook', error: error.message });
  }
};


// Mengupdate logbook berdasarkan ID
exports.updateLogbook = async (req, res) => {
  const { id } = req.params;
  const { judul, subjek, nama_file, NIM, status, jenis } = req.body;
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
      status,
      jenis
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
