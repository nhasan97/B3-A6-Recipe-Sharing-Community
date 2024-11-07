"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const addAdmin = async (adminData: FieldValues): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/users/create-user", adminData);

    return data;
  } catch (error: any) {
    throw new Error(`Failed to post rating ${error.message}`);
  }
};
