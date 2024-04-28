import authService from '../services/auth.service.js';

const loginController = async (req, res) => {
  // Get email and password from request body
  const { email, password } = req.body;

  try {
    // Call the loginService method of authService to perform the login
    const token = await authService.loginService({ email, password });

    return res.send(token);
  } catch (e) {
    return res.status(401).send(e.message);
  }
};

export default { loginController };
