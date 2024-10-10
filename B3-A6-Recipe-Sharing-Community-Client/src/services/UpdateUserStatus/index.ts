"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const changeUserStatus = async ({
  userId,
  status,
}: {
  userId: string;
  status: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/users/${userId}?status=${status}`
    );

    revalidateTag("users");

    return data;
  } catch (error: any) {
    throw new Error(`Failed to change ${error.message}`);
  }
};
