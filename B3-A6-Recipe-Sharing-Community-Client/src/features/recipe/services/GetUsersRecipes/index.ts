"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { toast } from "sonner";

export const getUsersRecipes = async (
  userID: string,
  loggedInUserEmail: string | undefined,
  searchTerm: string,
  category: string,
  contentType: string,
  sort: string,
  page: number,
  limit: number
) => {
  try {
    const params = new URLSearchParams();

    if (loggedInUserEmail) {
      params.append("loggedInUserEmail", loggedInUserEmail);
    }
    if (searchTerm) {
      params.append("searchTerm", searchTerm);
    }
    if (category) {
      params.append("category", category);
    }
    if (contentType) {
      params.append("contentType", contentType);
    }
    if (sort) {
      params.append("sort", sort);
    }
    if (page) {
      params.append("page", page.toString());
    }
    if (limit) {
      params.append("limit", limit.toString());
    }

    const res = await axiosInstance.get(`/recipes/user/${userID}?${params}`);

    return res.data;
  } catch (error) {
    toast.error("Failed to fetch data: " + error);
    throw new Error("Failed to fetch data");
  }
};
