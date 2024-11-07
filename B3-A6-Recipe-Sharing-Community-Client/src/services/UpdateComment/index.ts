"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const updateComment = async ({
  commentId,
  updatedCommentData,
}: {
  commentId: string;
  updatedCommentData: FieldValues;
}) => {
  try {
    const { data } = await axiosInstance.patch(
      `/comments/update-comment/${commentId}`,
      updatedCommentData
    );

    return data;
  } catch (error: any) {
    throw new Error(`Failed to update recipe ${error.message}`);
  }
};
