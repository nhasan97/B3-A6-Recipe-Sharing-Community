"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const changeUserPassword = async (
  passwordData: FieldValues
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/change-password",
      passwordData
    );

    return data;
  } catch (error: any) {
    throw new Error(`Failed to change ${error.message}`);
  }
};
