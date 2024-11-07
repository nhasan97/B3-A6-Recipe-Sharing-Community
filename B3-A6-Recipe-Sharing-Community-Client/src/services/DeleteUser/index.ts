"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const deleteUser = async ({ userId }: { userId: string }) => {
  try {
    const { data } = await axiosInstance.delete(`/users/${userId}`);

    return data;
  } catch (error: any) {
    throw new Error(`Failed to delete recipe ${error.message}`);
  }
};
