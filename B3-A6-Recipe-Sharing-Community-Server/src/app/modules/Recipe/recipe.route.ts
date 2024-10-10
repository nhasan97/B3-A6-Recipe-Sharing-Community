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

router.get('/', RecipeControllers.getAllRecipes);

router.get('/:id', RecipeControllers.getSingleRecipe);

router.get('/user/:id', RecipeControllers.getRecipesByUser);

router.get('/count/all-recipe', RecipeControllers.getRecipeCount);

export const RecipeRoutes = router;
