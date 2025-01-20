// controllers/authController.js
const { registerUser, authenticateUser } = require('../services/authService');

// Handle user registration
const register = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await registerUser(username, password);
    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Handle user login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { user, token } = await authenticateUser(username, password);
    return res.json({ message: 'Login successful', token, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };
