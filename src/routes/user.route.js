import { Router } from 'express';
import userController from '../controllers/user.controller.js';
// MIDDLEWARE
import { validId, validUser } from '../middlewares/global.middlewares.js';

const userRoute = Router();

//Create user
userRoute.post('/', userController.create);

userRoute.post('/', (req, res) => {
  console.log('POST /user');
  userController.create(req, res);
});

//Find all users
userRoute.get('/', userController.findAllUsers);

//Finding by id
userRoute.get('/:id', validId, validUser, userController.findById);

//Update one data
userRoute.patch('/:id', validId, validUser, userController.update);

export default userRoute;
