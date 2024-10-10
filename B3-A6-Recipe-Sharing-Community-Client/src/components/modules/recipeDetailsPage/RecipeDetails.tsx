"use client";

import { IRecipe } from "@/src/types/recipe.type";
import React from "react";
import ImageGallery from "../../UI/ImageGallery";
import IngredientCard from "../../UI/IngredientCard";
import { Button } from "@nextui-org/button";

const RecipeDetails = ({ recipeData }: { recipeData: { data: IRecipe } }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-6xl">{recipeData?.data?.title}</h1>

      <ImageGallery images={recipeData?.data?.images} />

      <div className="flex items-center gap-6">
        <p>Rating | {recipeData?.data?.rating}</p>

        <Button>
          <i className="fa-solid fa-arrow-up" />
          {recipeData?.data?.upVote?.length}
        </Button>

        <Button>
          <i className="fa-solid fa-arrow-down" />
          {recipeData?.data?.downVote?.length}
        </Button>
      </div>

      <p>Instructions | {recipeData?.data?.instruction}</p>

      <div>
        <h3 className="text-3xl">Ingredients Checklist</h3>

        <div>
          {recipeData?.data?.ingredients?.map((ingredient: string) => (
            <IngredientCard key={ingredient} ingredient={ingredient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
