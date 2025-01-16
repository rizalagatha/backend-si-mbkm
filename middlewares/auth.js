const jwt = require('jsonwebtoken');

// Middleware untuk otentikasi token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing from Authorization header' });
  }

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid or expired' });
    }
    req.user = user; // Menyimpan informasi user di req.user
    next();
  });
};

// Middleware untuk otorisasi role
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: Insufficient role' });
    }
    next();
  };
};

module.exports = { authenticateToken, authorize };
