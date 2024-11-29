const { Op } = require('sequelize');
const BerkasPenilaian = require('../models/berkasPenilaian');

const validFileTypes = ['CV', 'transkrip', 'KTP', 'sertifikat', 'dokumen_tambahan'];

const uploadFile = async (req, res) => {
  try {
    const { id_pendaftaran_mbkm, id_konversi_nilai, jenis_berkas } = req.body;

    // Validasi file yang diunggah
    if (!req.file) {
      return res.status(400).json({ error: 'Tidak ada file yang diunggah.' });
    }

    // Validasi jenis_berkas
    if (!validFileTypes.includes(jenis_berkas)) {
      return res.status(400).json({ error: `Jenis file tidak valid. Harus salah satu dari: ${validFileTypes.join(', ')}` });
    }

    // Simpan ke database
    const newBerkas = await BerkasPenilaian.create({
      id_pendaftaran_mbkm,
      id_konversi_nilai,
      nama_berkas: req.file.path,
      jenis_berkas, // Simpan jenis berkas
    });

    res.status(200).json({ message: `${jenis_berkas} berhasil diunggah`, data: newBerkas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah berkas.' });
  }
};

const getFilesByType = async (req, res) => {
  try {
    const fileType = req.params.jenis_berkas;

    // Validasi jenis file
    const validFileTypes = ['CV', 'transkrip', 'KTP', 'sertifikat', 'dokumen_tambahan'];
    if (!validFileTypes.includes(fileType)) {
      return res.status(400).json({ error: `Jenis file tidak valid. Harus salah satu dari: ${validFileTypes.join(', ')}` });
    }

    // Cari data berdasarkan jenis berkas
    const berkas = await BerkasPenilaian.findAll({
      where: {
        jenis_berkas: fileType,
      },
    });

    if (berkas.length === 0) {
      return res.status(404).json({ error: `Tidak ada data untuk jenis file: ${fileType}` });
    }

    res.status(200).json({ message: `Berhasil mengambil data untuk jenis file: ${fileType}`, data: berkas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Terjadi kesalahan saat mengambil data untuk jenis file: ${fileType}` });
  }
};

module.exports = {
  uploadFile,
  getFilesByType
};
