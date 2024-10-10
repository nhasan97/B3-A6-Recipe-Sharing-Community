import { ObjectId } from 'mongoose';
import { CONTENT_TYPE, RECIPE_STATUS } from './recipe.constant';

export type TRecipe = {
  title: string;
  instruction: string;
  ingredients: string[];
  cookingTime: string;
  images?: string[];
  contentType: keyof typeof CONTENT_TYPE;
  rating: number;
  upVote: string[];
  downVote: string[];
  tags?: string[];
  status: keyof typeof RECIPE_STATUS;
  user: ObjectId;
  isDeleted?: boolean;
};
