"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { toast } from "sonner";

export const getRecipes = async (
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

    const res = await axiosInstance.get(
      `/recipes/getAllRecipes/${loggedInUserEmail}?${params}`
    );

    return res.data;
  } catch (error) {
    toast.error("Failed to fetch data: " + error);
    throw new Error("Failed to fetch data");
  }
};

export const getSingleRecipe = async (recipeID: string) => {
  try {
    const res = await axiosInstance.get(`/recipes/${recipeID}`);

    return res.data;
  } catch (error) {
    toast.error("Failed to fetch data: " + error);
    throw new Error("Failed to fetch data");
  }
};

export const getRecipeCount = async (loggedInUserEmail: string | undefined) => {
  try {
    const res = await axiosInstance.get(
      `/recipes/count/all-recipe?loggedInUserEmail=${loggedInUserEmail}`
    );

    return res.data;
  } catch (error) {
    toast.error("Failed to fetch data: " + error);
    throw new Error("Failed to fetch data");
  }
};

export const getUsersRecipeCount = async (userId: string) => {
  try {
    const res = await axiosInstance.get(
      `/recipes/count/users-recipe/${userId}`
    );

    return res.data;
  } catch (error) {
    toast.error("Failed to fetch data: " + error);
    throw new Error("Failed to fetch data");
  }
};
