import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userService from '../services/user.service.js';

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    // Get the Authorization header from the request
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(401);
    }

    // Split the Authorization header into parts
    const parts = authorization.split(' ');

    if (parts.length !== 2) {
      return res.sendStatus(401);
    }

    // Destructure the parts into schema and token
    const [schema, token] = parts;

    if (schema !== 'Bearer') {
      return res.sendStatus(401);
    }

    // Verify the JWT token using the secret key from environment variables
    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: 'Token Invalid!' });
      }

      // Find the user by ID from the decoded token using the user service
      const user = await userService.findByIdService(decoded.id);

      // Check if the user exists and has an ID
      if (!user || !user.id) {
        return res.status(401).send({ message: 'Invalid Token!' });
      }

      // Attach the user ID to the request object
      req.userId = user.id;

      return next();
    });
  } catch (err) {
    res.status(500).send(err.nessage);
  }
};
