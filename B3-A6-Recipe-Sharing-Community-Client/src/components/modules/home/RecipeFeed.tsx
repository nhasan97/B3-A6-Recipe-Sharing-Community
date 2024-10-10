import axiosInstance from "@/src/lib/AxiosInstance";
import React from "react";
import RecipeFeedCard from "../../UI/RecipeFeedCard";
import { IRecipe } from "@/src/types/recipe.type";

const RecipeFeed = async () => {
  const { data } = await axiosInstance.get("/recipes");

  return (
    <div>
      <h1>Recipe Feed</h1>
      <div className="mx-auto my-3">
        {data?.data?.map((recipe: IRecipe) => (
          <RecipeFeedCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeFeed;
