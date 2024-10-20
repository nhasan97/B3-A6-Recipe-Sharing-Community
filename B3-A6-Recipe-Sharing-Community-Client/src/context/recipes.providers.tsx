"use client";

import { createContext, useContext, useState } from "react";
import { IRecipeContext } from "../types/recipe.type";
import React from "react";
import { TChildren } from "../types/children.type";
import { useUser } from "./user.provider";
import { useGetRecipeCount, useGetRecipes } from "../hooks/recipe.hook";

const RecipeContex = createContext<IRecipeContext | undefined>(undefined);

const RecipeProvider = ({ children }: TChildren) => {
  const { isLoading: loadingUser, user: loggedInUser } = useUser();

  const { isLoading: loadingRecipeCount, data: loadedRecipeCount } =
    useGetRecipeCount(loggedInUser?.email);

  //States for browsing
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [contentType, setContentType] = useState("");
  const [sort, setSort] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  //retrieving all recipes
  const { isLoading: loadingRecipes, data: loadedRecipeData } = useGetRecipes(
    loggedInUser?.email,
    searchTerm,
    category,
    contentType,
    sort,
    currentPage,
    itemsPerPage
  );

  const reset = () => {
    setSearchTerm("");
    setCategory("");
    setContentType("");
    setSort("");
  };

  const recipeInfo: IRecipeContext = {
    loadingUser,
    loggedInUser,
    loadingRecipeCount,
    recipeCount: loadedRecipeCount?.data,
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
    reset,
  };

  return (
    <RecipeContex.Provider value={recipeInfo}>{children}</RecipeContex.Provider>
  );
};

export const useRecipeProvider = () => {
  const context = useContext(RecipeContex);

  if (context === undefined) {
    throw new Error("context invalid");
  }

  return context;
};

export default RecipeProvider;
