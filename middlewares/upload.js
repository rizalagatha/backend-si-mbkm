// middlewares/upload.js
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
  params: {
    folder: 'uploads-mbkm', // Ganti 'uploads' dengan nama folder yang Anda inginkan di Cloudinary
    format: async (req, file) => {
      const ext = path.extname(file.originalname).substring(1);
      return ext === 'jpg' ? 'jpeg' : ext; // Mengubah 'jpg' ke 'jpeg' jika diperlukan
    },
    public_id: (req, file) => file.originalname.split('.')[0], // Nama file di Cloudinary
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
