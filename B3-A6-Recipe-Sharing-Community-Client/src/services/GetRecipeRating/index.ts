"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { toast } from "sonner";

// export const getRecipeRating = async (recipeId: string) => {
//   try {
//     const res = await axiosInstance.get(`/ratings/${recipeId}`);

//     return res.data;
//   } catch (error) {
//     toast.error("Failed to fetch data: " + error);
//     throw new Error("Failed to fetch data");
//   }
// };

export const getRecipeRating = async (recipeId: string, userId?: string) => {
  try {
    const params = new URLSearchParams();

    if (userId) {
      params.append("userId", userId);
    }

    const res = await axiosInstance.get(`/ratings/${recipeId}?${params}`);

    return res.data;
  } catch (error) {
    toast.error("Failed to fetch data: " + error);
    throw new Error("Failed to fetch data");
  }
};
