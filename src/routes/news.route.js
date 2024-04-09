import { Router } from 'express';
const router = Router();

import {
  create,
  findAllNews,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  deleteNews,
  likeNews,
  addComment,
  deleteComment,
} from '../controllers/news.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

// Routes for creating, fetching, and manipulating news
router.post('/', authMiddleware, create);

router.get('/', findAllNews);
router.get('/top', topNews);
router.get('/search', searchByTitle);
router.get('/byuser', authMiddleware, byUser);

// Routes for manipulating individual news
router.get('/:id', authMiddleware, findById);
router.patch('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, deleteNews);

// Routes for manipulating likes and comments on news
router.patch('/like/:id', authMiddleware, likeNews);
router.patch('/comment/:id', authMiddleware, addComment);
router.patch('/comment/:idNews/:idComment', authMiddleware, deleteComment);

export default router;
