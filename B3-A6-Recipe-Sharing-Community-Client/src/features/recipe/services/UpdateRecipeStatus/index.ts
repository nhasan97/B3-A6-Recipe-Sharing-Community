"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const changeRecipeStatus = async ({
  recipeId,
  status,
}: {
  recipeId: string;
  status: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/recipes/${recipeId}?status=${status}`
    );

    revalidateTag("recipes");

    return data;
  } catch (error: any) {
    throw new Error(`Failed to change ${error.message}`);
  }
};
