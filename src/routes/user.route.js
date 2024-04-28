import userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { validId } from '../middlewares/global.middleware.js';

//Create user
userRouter.post('/create', userController.createUserController);

// Apply authMiddleware to all routes below this line
userRouter.use(authMiddleware);

//To fetch all users
userRouter.get('/', userController.findAllUserController);

// Apply validId middleware (global) to all routes below this line
userRouter.use(validId);

//To find a user by ID
userRouter.get('/findById/:id?', userController.findUserByIdController);

//To update user details
userRouter.patch('/update/:id', userController.updateUserController);

export default userRouter;
