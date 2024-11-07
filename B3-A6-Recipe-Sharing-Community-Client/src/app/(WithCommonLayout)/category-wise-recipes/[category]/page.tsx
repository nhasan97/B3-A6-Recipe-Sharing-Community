"use client";

import Container from "@/src/components/layouts/Container";
import Browser from "@/src/components/shared/Browser";
import LoadingSection from "@/src/components/shared/LoadingSection";
import NoData from "@/src/components/shared/NoData";
import DisplayRecipes from "@/src/components/UI/DisplayRecipes";
import { useRecipeProvider } from "@/src/context/recipes.providers";
import Head from "next/head";
import React, { useEffect } from "react";
import categories from "../../../../../public/data/category.json";
import "../../../../styles/categoryWisePage.css";

const CategoryWiseRecipePage = ({ params }: { params: any }) => {
  const { loadingUser, loggedInUser, setCategory, loadingRecipes, recipeData } =
    useRecipeProvider();

  useEffect(() => {
    setCategory(params.category.split("%20").join(" "));
  }, [params.category, setCategory]);

  const matchedCategory = categories.find(
    (item) =>
      item.category.toLowerCase() ===
      params.category.split("%20").join(" ")?.toLowerCase()
  );

  return (
    <Container>
      <Head>
        <title>Home | Category wise recipes</title>
      </Head>

      <div className="w-full h-[calc(100vh-64px)] py-4">
        <div className="mb-6">
          <Browser
            searchBoxText={`Search in ${params.category
              .split("%20")
              .join(" ")}`}
            categoryFilter={false}
            contentTypeFilter={loggedInUser?.userType === "PRO" ? true : false}
            sortBox={false}
          />
        </div>
        <div className="h-[calc(100%-96px)] py-4 overflow-y-auto">
          {loadingUser || loadingRecipes ? (
            <LoadingSection />
          ) : recipeData?.length ? (
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-4 gap-6 ">
              <div
                style={{ backgroundImage: `url(${matchedCategory?.image})` }}
                className="h-[200px] md:h-full lg:col-span-1 flex lg:flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-fixed bg-[#000000af] bg-blend-overlay rounded-lg"
              >
                <p className="hidden vertical-text lg:flex lg:text-4xl xl:text-5xl 2xl:text-7xl text-white font-medium text-center shadow-lg shadow-white">
                  {matchedCategory?.category}
                </p>
                <p className="lg:hidden flex text-2xl md:text-5xl text-white font-medium text-center shadow-lg shadow-white">
                  {matchedCategory?.category}
                </p>
              </div>
              <div className="lg:col-span-3">
                <DisplayRecipes
                  recipeData={recipeData}
                  caller="categoryWiseRecipes"
                />
              </div>
            </div>
          ) : (
            <NoData text={"No Data Found"} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default CategoryWiseRecipePage;
