"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const postComment = async (comment: FieldValues): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/comments", comment);

    revalidateTag("comments");

    return data;
  } catch (error: any) {
    throw new Error(`Failed to post comment ${error.message}`);
  }
};
