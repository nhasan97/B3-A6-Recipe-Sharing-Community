import { TComment } from './comment.interface';
import { Comment } from './comment.model';

const createCommentIntoDB = async (payload: TComment) => {
  const result = await Comment.create(payload);
  return result;
};

const getRecipeCommentsFromDB = async (recipeId: string) => {
  const result = await Comment.find({ recipe: recipeId }).populate('user');
  return result;
};

export const CommentServices = {
  createCommentIntoDB,
  getRecipeCommentsFromDB,
};
