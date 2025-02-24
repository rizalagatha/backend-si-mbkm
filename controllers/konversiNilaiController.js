const KonversiNilai = require('../models/konversiNilai');
const Dosbing = require('../models/dosbing');
const BerkasPenilaian = require('../models/berkasPenilaian');
const PendaftaranMatkulKnvrs = require('../models/pendaftaranmatkulknvrs'); // Model baru yang ditambahkan

// Create a new KonversiNilai
const createKonversiNilai = async (req, res) => {
  const { id_pendaftaran_matkul_knvrs, NIP_dosbing, nama_berkas, nilai_akhir, status } = req.body;

  try {
    // Pastikan pendaftaran mata kuliah yang dikonversi ada
    const pendaftaran = await PendaftaranMatkulKnvrs.findByPk(id_pendaftaran_matkul_knvrs);
    if (!pendaftaran) {
      return res.status(404).json({ message: 'Pendaftaran mata kuliah tidak ditemukan' });
    }

    const konversiNilai = await KonversiNilai.create({
      id_pendaftaran_matkul_knvrs,
      NIP_dosbing,
      nilai_akhir,
      nama_berkas,
      status
    });

    res.status(201).json({ message: 'Konversi Nilai berhasil dibuat', konversiNilai });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all KonversiNilai
const getAllKonversiNilai = async (req, res) => {
  try {
    const konversiNilai = await KonversiNilai.findAll({
      include: [{ model: PendaftaranMatkulKnvrs }] // Tambahkan informasi pendaftaran matkul
    });
    res.status(200).json(konversiNilai);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a KonversiNilai by ID
const getKonversiNilaiById = async (req, res) => {
  const { id } = req.params;
  try {
    const konversiNilai = await KonversiNilai.findByPk(id, {
      include: [{ model: PendaftaranMatkulKnvrs }] // Tambahkan informasi pendaftaran matkul
    });
    if (konversiNilai) {
      res.status(200).json(konversiNilai);
    } else {
      res.status(404).json({ message: 'Konversi Nilai tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a KonversiNilai
const updateKonversiNilai = async (req, res) => {
  const { id } = req.params;
  const { id_pendaftaran_matkul_knvrs, NIP_dosbing, nama_berkas, nilai_akhir, status } = req.body;

  try {
    // Pastikan pendaftaran mata kuliah yang dikonversi ada
    const pendaftaran = await PendaftaranMatkulKnvrs.findByPk(id_pendaftaran_matkul_knvrs);
    if (!pendaftaran) {
      return res.status(404).json({ message: 'Pendaftaran mata kuliah tidak ditemukan' });
    }

    const [updated] = await KonversiNilai.update(
      { id_pendaftaran_matkul_knvrs, NIP_dosbing, nama_berkas, nilai_akhir, status },
      { where: { id_konversi_nilai: id } }
    );

    if (updated) {
      const updatedKonversiNilai = await KonversiNilai.findByPk(id, {
        include: [{ model: PendaftaranMatkulKnvrs }] // Tambahkan informasi pendaftaran matkul
      });
      res.status(200).json({ message: 'Konversi Nilai berhasil diperbarui', updatedKonversiNilai });
    } else {
      res.status(404).json({ message: 'Konversi Nilai tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a KonversiNilai
const deleteKonversiNilai = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await KonversiNilai.destroy({ where: { id_konversi_nilai: id } });
    if (deleted) {
      res.status(204).json({ message: 'Konversi Nilai berhasil dihapus' });
    } else {
      res.status(404).json({ message: 'Konversi Nilai tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createKonversiNilai,
  getAllKonversiNilai,
  getKonversiNilaiById,
  updateKonversiNilai,
  deleteKonversiNilai
};
