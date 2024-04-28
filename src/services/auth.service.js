import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import userRepositories from '../repositories/user.repositories.js';

// To generate a JWT token with a given user ID
function generateToken(id) {
  // Sign a JWT token containing the user ID using the secret from environment variables
  return jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });
}

// To handle user login
const loginService = async ({ email, password }) => {
  // Find user by email using the userRepositories
  const user = await userRepositories.findByEmailUserRepository(email);

  if (!user) throw new Error('Wrong password or username');

  // Check if the provided password matches the user's hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error('Invalid password');

  // Generate a JWT token for the authenticated user
  const token = generateToken(user.id);

  return token;
};

export default { loginService, generateToken };
