import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { IDate } from "./date.type";
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
  createdAt?: IDate;
}

export interface IRecipeContext {
  loadingUser: boolean;
  loggedInUser: IUser | null;
  loadingRecipeCount: boolean;
  recipeCount: number;
  loadingUsersRecipeCount: boolean;
  usersPublishedRecipeCount: number;
  usersUnpublishedRecipeCount: number;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  contentType: string;
  setContentType: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  loadingRecipes: boolean;
  recipeData: IRecipe[];
  refetchAllRecipes: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  loadingUsersRecipes: boolean;
  usersRecipeData: IRecipe[];
  resetBrowser: () => void;
  resetPagination: () => void;
}
