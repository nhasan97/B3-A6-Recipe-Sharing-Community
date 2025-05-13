"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const deleteRecipe = async ({ recipeId }: { recipeId: string }) => {
  try {
    const { data } = await axiosInstance.delete(`/recipes/${recipeId}`);

    revalidateTag("recipes");

    return data;
  } catch (error: any) {
    throw new Error(`Failed to delete recipe ${error.message}`);
  }
};
