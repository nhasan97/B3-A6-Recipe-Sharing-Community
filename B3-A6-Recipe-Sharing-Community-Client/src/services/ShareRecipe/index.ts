"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const shareRecipe = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.post("/recipes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("recipes");

    return data;
  } catch (error: any) {
    throw new Error(`Failed to create recipe ${error.message}`);
  }
};
