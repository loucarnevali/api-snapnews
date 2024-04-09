import mongoose from 'mongoose';
import userService from '../services/user.service.js';

//To validate user ID
export const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    // Check if the ID is valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid ID' });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// To check if user exists
export const validUser = async (req, res, next) => {
  try {
    // Get the user ID from request parameters
    const id = req.params.id;
    // Find the user by ID using the user service
    const user = await userService.findByIdService(id);

    // Check if the user exists
    if (!user) {
      return res.status(400).send({ message: 'User Not Found' });
    }

    // Attach the user ID and user object to the request object for use in the next route handler
    req.id = id;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
