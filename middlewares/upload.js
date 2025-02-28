const crypto = require('crypto');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');

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
    // Buat hash unik untuk nama file
    const uniqueSuffix = crypto.randomBytes(8).toString('hex'); // Contoh: "a1b2c3d4e5f6"
    const extension = path.extname(file.originalname).slice(1); // Ambil ekstensi file (pdf, jpg, png)
    const originalName = path.basename(file.originalname, path.extname(file.originalname)); // Ambil nama asli tanpa ekstensi

    return {
      folder: 'uploads', // Folder di Cloudinary
      format: extension, // Format file
      public_id: `${originalName}_${uniqueSuffix}`, // Nama unik untuk menghindari duplikasi
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
