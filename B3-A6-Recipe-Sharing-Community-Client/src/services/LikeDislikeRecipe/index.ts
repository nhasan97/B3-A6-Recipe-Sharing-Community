"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const likeUnlikeRecipe = async ({
  recipeId,
  loggedInUserId,
  likeStatus,
}: {
  recipeId: string;
  loggedInUserId: string;
  likeStatus: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/recipes/like/unlike-recipe/${recipeId}?loggedInUserId=${loggedInUserId}&likeStatus=${likeStatus}`
    );

    return data;
  } catch (error: any) {
    throw new Error(`Failed to change ${error.message}`);
  }
};

export const dislikeUndislikeRecipe = async ({
  recipeId,
  loggedInUserId,
  dislikeStatus,
}: {
  recipeId: string;
  loggedInUserId: string;
  dislikeStatus: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      `/recipes/dislike/undislike/recipe/${recipeId}?loggedInUserId=${loggedInUserId}&dislikeStatus=${dislikeStatus}`
    );

    return data;
  } catch (error: any) {
    throw new Error(`Failed to change ${error.message}`);
  }
};
