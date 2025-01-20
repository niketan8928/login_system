// services/authService.js
const client = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

const registerUser = async (username, password) => {
  const hashedPassword = await hashPassword(password);
  
  // Insert the new user into the database
  const result = await client.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
    [username, hashedPassword]
  );
  
  return result.rows[0];  // Return the user object
};

const authenticateUser = async (username, password) => {
  const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];

  if (!user) {
    throw new Error('User not found');
  }

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  const token = generateToken(user.id, user.username);
  return { user, token };
};

module.exports = { registerUser, authenticateUser };
