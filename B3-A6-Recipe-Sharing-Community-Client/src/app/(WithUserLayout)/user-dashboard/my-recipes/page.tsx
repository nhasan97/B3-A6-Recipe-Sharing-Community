import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import DisplayMyRecipes from "@/src/components/modules/myRecipes/DisplayMyRecipes";
import MembersRecipeCard from "@/src/components/UI/MembersRecipeCard";
import { useUser } from "@/src/context/user.provider";
import axiosInstance from "@/src/lib/AxiosInstance";
import { IRecipe } from "@/src/types/recipe.type";
import React from "react";

const MyRecipesPage = async () => {
  // const { user } = useUser();
  const { data: userRecipeData } = await axiosInstance.get(`/recipes`);

  return (
    <div className="h-screen">
      <DashboardContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {userRecipeData?.data?.map((recipe: IRecipe) => (
            <MembersRecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default MyRecipesPage;
