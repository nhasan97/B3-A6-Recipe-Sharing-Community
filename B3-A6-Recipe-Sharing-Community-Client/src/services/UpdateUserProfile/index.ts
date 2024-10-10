"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const updateUserProfile = async (formData: FormData) => {
  try {
    const { data } = await axiosInstance.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("users");

    return data;
  } catch (error: any) {
    throw new Error(`Failed to create recipe ${error.message}`);
  }
};
