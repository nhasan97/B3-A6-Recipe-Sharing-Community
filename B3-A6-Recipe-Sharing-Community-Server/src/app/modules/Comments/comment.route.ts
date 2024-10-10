import express from 'express';
import { CommentControllers } from './comment.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { CommentValidation } from './comment.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  validateRequest(CommentValidation.createCommentValidationSchema),
  CommentControllers.createComment
);

router.get('/:recipeID', CommentControllers.getRecipeComments);

export const CommentRoutes = router;
