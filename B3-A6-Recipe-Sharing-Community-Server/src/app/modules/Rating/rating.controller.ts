import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RatingServices } from './rating.service';

const postRating = catchAsync(async (req, res) => {
  const response = await RatingServices.postRatingIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rating Added Successfully',
    data: response,
  });
});

const getRecipeRating = catchAsync(async (req, res) => {
  const response = await RatingServices.getRecipeRatingFromDB(
    req.params.recipeID,
    req?.query?.userId as string | undefined
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rating retrieved successfully',
    data: response,
  });
});

export const RatingControllers = {
  postRating,
  getRecipeRating,
};
