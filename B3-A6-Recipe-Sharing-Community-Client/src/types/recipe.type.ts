import { IUser } from "./user.type";

export const RECIPE_STATUS = {
  PUBLISHED: "PUBLISHED",
  UNPUBLISHED: "UNPUBLISHED",
} as const;

export const CONTENT_TYPE = {
  Open: "Open",
  Exclusive: "Exclusive",
} as const;

export interface IRecipe {
  _id?: string;
  title: string;
  instruction: string;
  ingredients: string[];
  cookingTime: string;
  images: string[];
  contentType: keyof typeof CONTENT_TYPE;
  rating: number;
  upVote: string[];
  downVote: string[];
  tags?: string[];
  status: keyof typeof RECIPE_STATUS;
  user: IUser;
  isDeleted?: boolean;
}
