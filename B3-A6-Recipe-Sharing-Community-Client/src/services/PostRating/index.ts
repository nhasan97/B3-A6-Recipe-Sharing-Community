"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const postRating = async (rating: FieldValues): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/ratings", rating);

    revalidateTag("ratings");

    return data;
  } catch (error: any) {
    throw new Error(`Failed to post rating ${error.message}`);
  }
};
