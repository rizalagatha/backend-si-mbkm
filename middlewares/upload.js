const path = require('path');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary, storage } = require('../config/cloudinaryConfig');

// Konfigurasi CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folder = req.body.folder || 'uploads'; // Folder bisa dikustomisasi dari request
    const fileName = path.basename(file.originalname, path.extname(file.originalname));
    const format = path.extname(file.originalname).slice(1).toLowerCase();

    return {
      folder,
      public_id: fileName,
      format,
      transformation: [{ width: 800, height: 800, crop: 'limit' }], // Contoh transformasi
    };
  },
});

// File filter untuk validasi format
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .pdf, .jpg, and .png formats are allowed'), false);
  }
};

// Konfigurasi Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file 5MB
}).single('file');

const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Multer error occurred during file upload.', error: err.message });
    } else if (err) {
      return res.status(500).json({ message: 'File upload failed.', error: err.message });
    }
    next();
  });
};

module.exports = uploadMiddleware;