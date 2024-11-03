import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TComment } from './comment.interface';
import { Comment } from './comment.model';

const createCommentIntoDB = async (payload: TComment) => {
  const result = await Comment.create(payload);
  return result;
};

const getRecipeCommentsFromDB = async (recipeId: string) => {
  const result = await Comment.find({
    recipe: recipeId,
    isDeleted: { $ne: true },
  }).populate('user');
  return result;
};

const updateCommentIntoDB = async (
  commentID: string,
  data: Partial<TComment>
) => {
  const filter = {
    _id: commentID,
  };

  const comment = await Comment.findOne(filter);

  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment does not exixts!');
  }

  return await Comment.findOneAndUpdate(filter, data, { new: true });
};

const deleteCommentFromDB = async (commentID: string) => {
  const comment = await Comment.doesCommentExist(commentID);
  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  const response = await Comment.findByIdAndUpdate(
    commentID,
    { isDeleted: true },
    { new: true }
  );

  return response;
};

export const CommentServices = {
  createCommentIntoDB,
  getRecipeCommentsFromDB,
  updateCommentIntoDB,
  deleteCommentFromDB,
};
