import { IRecipe } from "./recipe.type";
import { IUser } from "./user.type";

export interface IComment {
  _id?: string;
  user: IUser;
  recipe: IRecipe;
  comment: string;
  isDeleted?: boolean;
}
