"use client";

import React, { useEffect } from "react";
import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import Browser from "@/src/components/shared/Browser";
import LoadingSection from "@/src/components/shared/LoadingSection";
import NoData from "@/src/components/shared/NoData";
import Pagination from "@/src/components/shared/Pagination";
import { useRecipeProvider } from "@/src/context/recipes.providers";
import DisplayRecipes from "@/src/components/UI/DisplayRecipes";
import DashboardPageTitle from "@/src/components/shared/DashboardPageTitle";

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

  const title = {
    mainTitle: "Recipes",
  };

  return (
    <div className="h-screen bg-[url('/assets/images/dashboard-recipes-bg-mobileTab.png')] xl:bg-[url('/assets/images/dashboard-recipes-bg-pc.png')] bg-cover bg-center bg-no-repeat">
      <DashboardContainer>
        <DashboardPageTitle title={title} />

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
          <Pagination caller="AllRecipesPage" />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AllRecipesPage;
