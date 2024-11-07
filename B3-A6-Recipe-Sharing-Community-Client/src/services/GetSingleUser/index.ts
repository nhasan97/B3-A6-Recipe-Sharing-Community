"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { toast } from "sonner";

export const getSingleUser = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/users/${userId}`);

    return res.data;
  } catch (error) {
    toast.error("Failed to fetch data: " + error);
    throw new Error("Failed to fetch data");
  }
};
