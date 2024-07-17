import { Router } from "express";
import { getArticles, createArticle, updateArticle, deleteArticle } from '../controllers/article';
import isAuth from '../middleware/is-auth';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/',
  isAuth,
  [
    body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters long.'),
    body('content').trim().isLength({ min: 5 }).withMessage('Content must be at least 5 characters long.')
  ],
  createArticle
);

router.get('/', isAuth, getArticles);

router.patch(
  '/:id',
  isAuth,
  [
    body('title').optional().trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters long.'),
    body('content').optional().trim().isLength({ min: 5 }).withMessage('Content must be at least 5 characters long.')
  ],
  updateArticle
);

router.delete('/:id', isAuth, deleteArticle);

export default router;