const BerkasPenilaian = require('../models/berkasPenilaian');

const uploadFile = async (req, res, fileType) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: `Tidak ada file ${fileType} yang diunggah.` });
    }

    const newBerkas = await BerkasPenilaian.create({
      id_pendaftaran_mbkm: req.body.id_pendaftaran_mbkm,
      id_konversi_nilai: req.body.id_konversi_nilai,
      nama_berkas: req.file.path,
    });

    res.status(200).json({ message: `${fileType} berhasil diunggah`, data: newBerkas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Terjadi kesalahan saat mengunggah ${fileType}` });
  }
};

module.exports = {
  uploadCV: (req, res) => uploadFile(req, res, 'CV'),
  uploadTranskrip: (req, res) => uploadFile(req, res, 'transkrip'),
  uploadKTP: (req, res) => uploadFile(req, res, 'KTP'),
  uploadSertifikat: (req, res) => uploadFile(req, res, 'sertifikat'),
  uploadDokumenTambahan: (req, res) => uploadFile(req, res, 'dokumen tambahan'),
};
