"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { toast } from "sonner";

export const getComments = async (recipeID: string) => {
  try {
    const res = await axiosInstance.get(`/comments/${recipeID}`);

    return res.data;
  } catch (error) {
    toast.error("Failed to fetch data: " + error);
    throw new Error("Failed to fetch data");
  }
};
