"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

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

    return data;
  } catch (error: any) {
    throw new Error(
      `Failed to update recipe ${error?.response?.data?.message}`
    );
  }
};
