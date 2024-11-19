// middlewares/upload.js
const path = require('path');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Konfigurasi CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'uploads', // Ganti dengan nama folder yang diinginkan di Cloudinary
      format: path.extname(file.originalname).slice(1), // Ekstensi file, misalnya: pdf, jpg, dll.
      public_id: path.basename(file.originalname, path.extname(file.originalname)), // Nama file tanpa ekstensi
    };
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .pdf, .jpg, and .png formats are allowed'), false);
  }
};

// Konfigurasi Multer dengan CloudinaryStorage dan fileFilter
const upload = multer({ storage, fileFilter });

module.exports = upload;
