import bcrypt from 'bcrypt';
import { generateToken, loginService } from '../services/auth.service.js';

const login = async (req, res) => {
  // Get email and password from request body
  const { email, password } = req.body;

  try {
    // Call the login service function to find the user by email
    const user = await loginService(email);

    //User validation
    if (!user) {
      return res.status(404).send({ message: 'User or Password not found' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    //Password validation
    if (!passwordIsValid) {
      return res.status(404).send({ message: 'User or Password not found' });
    }

    // Generate a JWT token with the user ID
    const token = generateToken(user.id);
    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { login };
