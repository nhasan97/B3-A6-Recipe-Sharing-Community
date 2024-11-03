import express from 'express';
import { RatingControllers } from './rating.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { RatingValidation } from './rating.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  validateRequest(RatingValidation.postRatingValidationSchema),
  RatingControllers.postRating
);

router.get('/:recipeID', RatingControllers.getRecipeRating);

export const RatingRoutes = router;
