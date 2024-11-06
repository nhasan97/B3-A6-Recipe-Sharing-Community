import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { multerUpload } from '../../config/multer.config';
import validateImageFileRequest from '../../middlewares/validateImageFileRequest';
import { ImageFilesArrayZodSchema } from '../../zod/image.validation';
import { parseBody } from '../../middlewares/bodyParser';
import validateRequest from '../../middlewares/validateRequest';
import { RecipeValidation } from './recipe.validation';
import { RecipeControllers } from './recipe.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  multerUpload.fields([{ name: 'itemImages' }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(RecipeValidation.createRecipeValidationSchema),
  RecipeControllers.createRecipe
);

router.get('/getAllRecipes/:email', RecipeControllers.getAllRecipes);

router.get('/:id', RecipeControllers.getSingleRecipe);

router.get('/user/:id', RecipeControllers.getRecipesByUser);

router.get('/count/all-recipe', RecipeControllers.getRecipeCount);

router.get(
  '/count/users-recipe/:userId',
  RecipeControllers.getUsersRecipeCount
);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  // validateRequest(UserValidation.updateUserValidationSchema),
  RecipeControllers.updateRecipeStatus
);

router.patch(
  '/update-recipe/:id',
  auth(USER_ROLE.USER),
  multerUpload.fields([{ name: 'itemImages' }]),
  // validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(RecipeValidation.updateRecipeValidationSchema),
  RecipeControllers.updateRecipe
);

router.patch(
  '/like/unlike-recipe/:id',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  RecipeControllers.likeUnlikeRecipe
);

router.post(
  '/dislike/undislike/recipe/:id',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  RecipeControllers.dislikeUndislikeRecipe
);

router.delete('/:id', auth(USER_ROLE.USER), RecipeControllers.deleteRecipe);

export const RecipeRoutes = router;
