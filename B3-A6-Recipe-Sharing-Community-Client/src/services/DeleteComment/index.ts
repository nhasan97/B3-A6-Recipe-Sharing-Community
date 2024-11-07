"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  try {
    const res = await axiosInstance.delete(
      `/comments/delete-comment/${commentId}`
    );

    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to delete comment ${error.message}`);
  }
};
