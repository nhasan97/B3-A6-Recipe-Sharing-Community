"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const updateRecipe = async ({
  recipeId,
  updatedRecipeData,
}: {
  recipeId: string;
  updatedRecipeData: FormData;
}) => {
  try {
    const { data } = await axiosInstance.patch(
      `/recipes/update-recipe/${recipeId}`,
      updatedRecipeData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    revalidateTag("recipes");

    return data;
  } catch (error: any) {
    throw new Error(`Failed to update recipe ${error.message}`);
  }
};
