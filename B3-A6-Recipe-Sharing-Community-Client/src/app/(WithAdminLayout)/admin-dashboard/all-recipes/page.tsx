import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import MembersRecipeCard from "@/src/components/UI/MembersRecipeCard";
import axiosInstance from "@/src/lib/AxiosInstance";
import { IRecipe } from "@/src/types/recipe.type";
import React from "react";

const AllRecipesPage = async () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // // const [category, setCategory] = useState(loadedCategory?.category);
  // const [sort, setSort] = useState("");
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  // const [currentPage, setCurrentPage] = useState(0);

  const { data: userRecipeData } = await axiosInstance.get(`/recipes`);

  const { data: recipeCount } = await axiosInstance.get(
    "/recipes/count/all-recipe"
  );

  console.log();

  const totalNumberOfRecipes = recipeCount.data;

  return (
    <div className="h-screen">
      <DashboardContainer>
        <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 overflow-y-scoll">
          {userRecipeData?.data?.map((recipe: IRecipe) => (
            <MembersRecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AllRecipesPage;
