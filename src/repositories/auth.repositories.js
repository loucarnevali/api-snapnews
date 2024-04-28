import User from '../models/User.js';

// Repository function to find a user by email and return the user document (including the password)
const loginRepository = (email) =>
  User.findOne({ email: email }).select('+password');

export default { loginRepository };
