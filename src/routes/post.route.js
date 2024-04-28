import postController from '../controllers/post.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { validId } from '../middlewares/global.middleware.js';

import { Router } from 'express';

const postRouter = Router();

postRouter.get('/', postController.findAllPostsController);
postRouter.get('/top', postController.topNewsController);
postRouter.get('/search', postController.searchPostController);

// Apply authMiddleware to all routes below this line
postRouter.use(authMiddleware);

// Route to create a new post
postRouter.post('/create', postController.createPostController);

// Apply validId middleware (global) to all routes below this line
postRouter.use(validId);

//To find a post by ID
postRouter.get('/byIdPost/:id', postController.findPostByIdController);

//To find posts by user ID
postRouter.get('/byUserId', postController.findPostsByUserIdController);

//To update a post
postRouter.patch('/update/:id', postController.updatePostController);

//To delete a post
postRouter.delete('/delete/:id', postController.deletePostController);

//To like a post
postRouter.patch('/:id/like', postController.likePostController);

//To add a comment to a post
postRouter.patch('/:id/comment', postController.commentPostController);

//To delete a comment from a post
postRouter.patch(
  '/:id/:idComment/comment',
  postController.commentDeletePostController,
);

export default postRouter;
