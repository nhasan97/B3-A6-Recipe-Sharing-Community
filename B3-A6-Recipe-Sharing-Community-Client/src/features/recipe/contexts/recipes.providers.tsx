"use client";

import { createContext, useContext, useState } from "react";

import React from "react";
import { IRecipeContext } from "../types/recipe.type";
import { TChildren } from "@/src/types/children.type";
import { useUser } from "@/src/context/user.provider";
import { useGetRecipeCount } from "../hooks/getRecipeCountHook";
import { useGetUsersRecipeCount } from "../hooks/getUsersRecipeCountHook";
import { useGetRecipes } from "../hooks/getRecipesHook";
import { useGetUsersRecipes } from "../hooks/getUsersRecipesHook";

const RecipeContext = createContext<IRecipeContext | undefined>(undefined);

const RecipeProvider = ({ children }: TChildren) => {
  const { isLoading: loadingUser, user: loggedInUser } = useUser();

  const { isLoading: loadingRecipeCount, data: loadedRecipeCount } =
    useGetRecipeCount(loggedInUser?.email);

  const { isLoading: loadingUsersRecipeCount, data: loadedUsersRecipeCount } =
    useGetUsersRecipeCount(loggedInUser?._id as string);

  //States for browsing
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [contentType, setContentType] = useState("");
  const [sort, setSort] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  //retrieving all recipes
  const {
    isLoading: loadingRecipes,
    data: loadedRecipeData,
    refetch: refetchAllRecipes,
  } = useGetRecipes(
    loggedInUser?.email,
    searchTerm,
    category,
    contentType,
    sort,
    currentPage,
    itemsPerPage
  );

  //retrieving user specific recipes
  const {
    isLoading: loadingUsersRecipes,
    data: loadedUsersRecipeData,
    refetch: refetchUsersRecipes,
  } = useGetUsersRecipes(
    loggedInUser?._id as string,
    loggedInUser?.email,
    searchTerm,
    category,
    contentType,
    sort,
    currentPage,
    itemsPerPage
  );

  const resetBrowser = () => {
    setSearchTerm("");
    setCategory("");
    setContentType("");
    setSort("");
  };

  const resetPagination = () => {
    setItemsPerPage(5);
    setCurrentPage(0);
  };

  const recipeInfo: IRecipeContext = {
    loadingUser,
    loggedInUser,
    loadingRecipeCount,
    recipeCount: loadedRecipeCount?.data,
    loadingUsersRecipeCount,
    usersPublishedRecipeCount: loadedUsersRecipeCount?.data?.publishedRecipes,
    usersUnpublishedRecipeCount:
      loadedUsersRecipeCount?.data?.unPublishedRecipes,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    contentType,
    setContentType,
    sort,
    setSort,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    loadingRecipes,
    recipeData: loadedRecipeData?.data,
    refetchAllRecipes,
    loadingUsersRecipes,
    usersRecipeData: loadedUsersRecipeData?.data,
    refetchUsersRecipes,
    resetBrowser,
    resetPagination,
  };

  return (
    <RecipeContext.Provider value={recipeInfo}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeProvider = () => {
  const context = useContext(RecipeContext);

  if (context === undefined) {
    throw new Error("context invalid");
  }

  return context;
};

export default RecipeProvider;
