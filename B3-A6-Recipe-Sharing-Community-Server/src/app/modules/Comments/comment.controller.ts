import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentServices } from './comment.service';

const createComment = catchAsync(async (req, res) => {
  const response = await CommentServices.createCommentIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment Created Successfully',
    data: response,
  });
});

const getRecipeComments = catchAsync(async (req, res) => {
  const recipeID = req.params.recipeID;
  const comments = await CommentServices.getRecipeCommentsFromDB(recipeID);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comments retrieved successfully',
    data: comments,
  });
});

export const CommentControllers = {
  createComment,
  getRecipeComments,
};
