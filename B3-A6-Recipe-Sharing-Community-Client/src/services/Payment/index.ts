"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const payment = async (userId: string): Promise<any> => {
  try {
    const res = await axiosInstance.patch(`/users/become-pro/${userId}`);

    revalidateTag("users");
    revalidateTag("payments");

    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to pay ${error.message}`);
  }
};
