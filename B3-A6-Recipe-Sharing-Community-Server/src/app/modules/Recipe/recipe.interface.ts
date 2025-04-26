import { Model, ObjectId } from 'mongoose';
import { CONTENT_TYPE, RECIPE_STATUS } from './recipe.constant';

export type TRecipe = {
  title: string;
  instruction: string;
  ingredients: string[];
  cookingTime: string;
  images?: string[];
  category: string;
  contentType: keyof typeof CONTENT_TYPE;
  rating: number;
  upVote: ObjectId[];
  downVote: ObjectId[];
  tags?: string[];
  status: keyof typeof RECIPE_STATUS;
  user: ObjectId;
  isDeleted?: boolean;
};

export type TRecipeUpdate = {
  title: string;
  instruction: string;
  ingredients: string[];
  cookingTime: string;
  images?: string[];
  category: string;
  contentType: keyof typeof CONTENT_TYPE;
  tags?: string[];
};

export interface RecipeModel extends Model<TRecipe> {
  doesRecipeExist(id: string): Promise<TRecipe>;
}
