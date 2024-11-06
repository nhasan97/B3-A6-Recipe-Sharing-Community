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
  const recipe = await RecipeServices.getAllRecipesFromDB(
    req.query,
    req.params.email
  );

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
  const response = await RecipeServices.getRecipeCountFromDB(
    req?.query?.loggedInUserEmail as string | undefined
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe fetched successfully',
    data: response,
  });
});

const getUsersRecipeCount = catchAsync(async (req, res) => {
  const response = await RecipeServices.getUsersRecipeCountFromDB(
    req?.params?.userId as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fetched successfully',
    data: response,
  });
});

const updateRecipeStatus = catchAsync(async (req, res) => {
  const recipe = await RecipeServices.updateRecipeStatusIntoDB(
    req?.params?.id,
    req?.query?.status as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'recipe status changed Successfully',
    data: recipe,
  });
});

const updateRecipe = catchAsync(async (req, res) => {
  // if (!req.files) {
  //   throw new AppError(400, 'Please upload an image');
  // }

  const recipe = await RecipeServices.updateRecipeIntoDB(
    req.params.id,
    req.body,
    req.files as TImageFiles
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe updated successfully',
    data: recipe,
  });
});

const deleteRecipe = catchAsync(async (req, res) => {
  const { id } = req.params;
  await RecipeServices.deleteRecipeFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe deleted successfully',
    data: null,
  });
});

const likeUnlikeRecipe = catchAsync(async (req, res) => {
  const recipe = await RecipeServices.likeUnlikeRecipeIntoDB(
    req?.params?.id,
    req?.query?.loggedInUserId as string,
    req?.query?.likeStatus as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'done Successfully',
    data: recipe,
  });
});

const dislikeUndislikeRecipe = catchAsync(async (req, res) => {
  const recipe = await RecipeServices.dislikeUndislikeRecipeIntoDB(
    req?.params?.id,
    req?.query?.loggedInUserId as string,
    req?.query?.dislikeStatus as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'done Successfully',
    data: recipe,
  });
});

export const RecipeControllers = {
  createRecipe,
  getAllRecipes,
  getRecipesByUser,
  getSingleRecipe,
  getRecipeCount,
  getUsersRecipeCount,
  updateRecipeStatus,
  updateRecipe,
  deleteRecipe,
  likeUnlikeRecipe,
  dislikeUndislikeRecipe,
};
