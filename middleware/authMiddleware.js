const jwt = require('jsonwebtoken');

// Middleware untuk memeriksa token dan role
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], 'secretKey'); // Pisahkan Bearer dari token
    req.user = decoded; // Menyimpan informasi token ke request untuk digunakan di route berikutnya
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

// Middleware untuk memeriksa apakah user memiliki role 'adminSiap'
const isAdminSiap = (req, res, next) => {
  if (req.user.role !== 'adminSiap') {
    return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdminSiap
};
