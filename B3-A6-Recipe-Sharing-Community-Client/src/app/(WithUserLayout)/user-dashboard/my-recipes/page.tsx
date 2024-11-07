"use client";

import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import Browser from "@/src/components/shared/Browser";
import DashboardPageTitle from "@/src/components/shared/DashboardPageTitle";
import LoadingSection from "@/src/components/shared/LoadingSection";
import NoData from "@/src/components/shared/NoData";
import Pagination from "@/src/components/shared/Pagination";
import DisplayRecipes from "@/src/components/UI/DisplayRecipes";
import { useRecipeProvider } from "@/src/context/recipes.providers";
import React, { useEffect } from "react";

const MyRecipesPage = () => {
  const {
    loadingUser,
    loadingUsersRecipes,
    usersRecipeData,
    resetBrowser,
    resetPagination,
  } = useRecipeProvider();

  useEffect(() => {
    resetBrowser();
    resetPagination();
  }, []);

  const title = {
    mainTitle: "My Recipes",
  };

  return (
    <div className="h-screen bg-[url('/assets/images/dashboard-recipes-bg-mobileTab-2.png')] xl:bg-[url('/assets/images/dashboard-recipes-bg-pc-2.png')] bg-cover bg-center bg-no-repeat">
      <DashboardContainer>
        <DashboardPageTitle title={title} />

        <div className="w-full relative">
          <Browser />
        </div>

        <div className="w-full h-[calc(80%-48px)] my-6 overflow-y-auto z-0">
          {loadingUser || loadingUsersRecipes ? (
            <LoadingSection />
          ) : usersRecipeData.length ? (
            <DisplayRecipes recipeData={usersRecipeData} caller="dashboard" />
          ) : (
            <NoData text={"No Data Found"} />
          )}
        </div>

        <div className="w-full">
          <Pagination caller="MyRecipesPage" />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default MyRecipesPage;
