"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { toast } from "sonner";

export const getActiveUsers = async (loggedInUserEmail: string | undefined) => {
  try {
    const res = await axiosInstance.get(
      `/users/without/blocked/${loggedInUserEmail}`
    );

    return res.data;
  } catch (error) {
    toast.error("Failed to fetch data: " + error);
    throw new Error("Failed to fetch data");
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get(`/users`);

    return res.data;
  } catch (error) {
    toast.error("Failed to fetch data: " + error);
    throw new Error("Failed to fetch data");
  }
};

export const getUsersCount = async () => {
  try {
    const res = await axiosInstance.get("/users/count/all-users");

    return res.data;
  } catch (error) {
    toast.error("Failed to fetch data: " + error);
    throw new Error("Failed to fetch data");
  }
};

export const getAllAdmins = async () => {
  try {
    const res = await axiosInstance.get("/users/admins");

    return res.data;
  } catch (error) {
    toast.error("Failed to fetch data: " + error);
    throw new Error("Failed to fetch data");
  }
};
