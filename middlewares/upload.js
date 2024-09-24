const multer = require('multer');
const path = require('path');

// Setup storage destination and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Tempat penyimpanan file yang diupload
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Penamaan file dengan timestamp
  }
});

// File upload restrictions
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit ukuran file 2MB
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Hanya file PDF yang diperbolehkan!');
    }
  }
});

module.exports = upload;
