import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RecipeServices } from './recipe.service';
import { TImageFiles } from '../../interfaces/image.interface';

const createRecipe = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new AppError(400, 'Please upload an image');
  }

  const recipe = await RecipeServices.createRecipeIntoDB(
    req.body,
    req.files as TImageFiles
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe created successfully',
    data: recipe,
  });
});

const getAllRecipes = catchAsync(async (req, res) => {
  const recipe = await RecipeServices.getAllRecipesFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe retrieved successfully',
    data: recipe,
  });
});

const getRecipesByUser = catchAsync(async (req, res) => {
  const recipe = await RecipeServices.getRecipesByUserFromDB(
    req.query,
    req.params.id as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipes retrieved successfully',
    data: recipe,
  });
});

const getSingleRecipe = catchAsync(async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await RecipeServices.getSingleRecipeFromDB(recipeId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe retrieved successfully',
    data: recipe,
  });
});

const getRecipeCount = catchAsync(async (req, res) => {
  const response = await RecipeServices.getRecipeCountFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe fetched successfully',
    data: response,
  });
});

export const RecipeControllers = {
  createRecipe,
  getAllRecipes,
  getRecipesByUser,
  getSingleRecipe,
  getRecipeCount,
};
