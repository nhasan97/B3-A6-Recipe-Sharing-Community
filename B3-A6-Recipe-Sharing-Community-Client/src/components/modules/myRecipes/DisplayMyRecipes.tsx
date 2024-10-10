import { IRecipe } from "@/src/types/recipe.type";
import React from "react";
import MembersRecipeCard from "../../UI/MembersRecipeCard";
import axiosInstance from "@/src/lib/AxiosInstance";

const DisplayMyRecipes = async ({ userID }: { userID: string }) => {
  const { data: userRecipeData } = await axiosInstance.get(
    `/recipes/user/${userID}`
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {userRecipeData?.data?.map((recipe: IRecipe) => (
        <MembersRecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default DisplayMyRecipes;
