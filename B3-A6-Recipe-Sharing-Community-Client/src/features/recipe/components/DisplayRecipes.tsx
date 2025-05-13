import { IRecipe } from "@/src/features/recipe/types/recipe.type";
import React from "react";
import MembersRecipeCard from "./MembersRecipeCard";

const DisplayRecipes = ({
  recipeData,
  caller = "",
}: {
  recipeData: IRecipe[];
  caller?: string;
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
        caller === "memberDetails" || caller === "categoryWiseRecipes"
          ? "xl:grid-cols-3"
          : "xl:grid-cols-4 2xl:grid-cols-5 "
      } gap-6`}
    >
      {recipeData?.map((recipe: IRecipe) => (
        <MembersRecipeCard key={recipe._id} recipe={recipe} caller={caller} />
      ))}
    </div>
  );
};

export default DisplayRecipes;
