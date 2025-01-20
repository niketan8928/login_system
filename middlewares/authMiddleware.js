// middlewares/authMiddleware.js
const { verifyToken } = require('../utils/jwt');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  req.user = decoded;  // Attach the user data to the request object
  next();
};

module.exports = { authenticateJWT };
