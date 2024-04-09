import { Router } from 'express';

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

const newsRoute = Router();

// Routes for creating, fetching, and manipulating news
newsRoute.post('/', authMiddleware, create);

newsRoute.get('/', findAllNews);
newsRoute.get('/top', topNews);
newsRoute.get('/search', searchByTitle);
newsRoute.get('/byuser', authMiddleware, byUser);

// Routes for manipulating individual news
newsRoute.get('/:id', authMiddleware, findById);
newsRoute.patch('/:id', authMiddleware, update);
newsRoute.delete('/:id', authMiddleware, deleteNews);

// Routes for manipulating likes and comments on news
newsRoute.patch('/like/:id', authMiddleware, likeNews);
newsRoute.patch('/comment/:id', authMiddleware, addComment);
newsRoute.patch('/comment/:idNews/:idComment', authMiddleware, deleteComment);

export default newsRoute;
