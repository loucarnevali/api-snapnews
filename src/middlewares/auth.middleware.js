import 'dotenv/config';
import jwt from 'jsonwebtoken';
import userRepositories from '../repositories/user.repositories.js';

function authMiddleware(req, res, next) {
  // Retrieve the Authorization header from the request
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({ message: 'The token was not informed!' });

  // Split the header into parts
  const parts = authHeader.split(' ');
  if (parts.length !== 2)
    return res.status(401).send({ message: 'Invalid token!' });

  // Destructure the parts into scheme and token
  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ message: 'Malformatted Token!' });

  // Verify the JWT token using the secret key from environment variables
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Invalid token!' });

    // Find user by ID from the decoded token
    const user = await userRepositories.findByIdUserRepository(decoded.id);
    if (!user || !user.id)
      return res.status(401).send({ message: 'Invalid token!' });

    // Set the user ID in the request object
    req.userId = user.id;

    return next();
  });
}

export default authMiddleware;
