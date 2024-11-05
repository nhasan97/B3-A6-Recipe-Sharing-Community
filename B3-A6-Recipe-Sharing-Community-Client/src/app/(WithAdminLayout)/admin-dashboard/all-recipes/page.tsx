"use client";

import React, { useEffect } from "react";
import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import Browser from "@/src/components/shared/Browser";
import LoadingSection from "@/src/components/shared/LoadingSection";
import NoData from "@/src/components/shared/NoData";
import Pagination from "@/src/components/shared/Pagination";
import { useRecipeProvider } from "@/src/context/recipes.providers";
import DisplayRecipes from "@/src/components/UI/DisplayRecipes";

const AllRecipesPage = () => {
  const {
    loadingUser,
    loadingRecipes,
    recipeData,
    resetBrowser,
    resetPagination,
  } = useRecipeProvider();

  useEffect(() => {
    resetBrowser();
    resetPagination();
  }, []);

  return (
    <div className="h-screen">
      <DashboardContainer>
        <div className="w-full relative">
          <Browser />
        </div>

        <div className="w-full h-[calc(80%-48px)] my-6 overflow-y-auto z-0">
          {loadingUser || loadingRecipes ? (
            <LoadingSection />
          ) : recipeData?.length ? (
            <DisplayRecipes recipeData={recipeData} caller="dashboard" />
          ) : (
            <NoData text={"No Data Found"} />
          )}
        </div>

        <div className="w-full">
          <Pagination />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AllRecipesPage;
