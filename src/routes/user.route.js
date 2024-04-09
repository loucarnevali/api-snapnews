import { Router } from 'express';
import userController from '../controllers/user.controller.js';
// MIDDLEWARE
import { validId, validUser } from '../middlewares/global.middlewares.js';

const router = Router();

//Create user
router.post('/', userController.create);

//Find all users
router.get('/', userController.findAllUsers);

//Finding by id
router.get('/:id', validId, validUser, userController.findById);

//Update one data
router.patch('/:id', validId, validUser, userController.update);

export default router;
