"use client";

import React, { useEffect, useState } from "react";
import Container from "@/src/components/layouts/Container";
import RecipeFeed from "@/src/components/modules/home/RecipeFeed";
import { useUser } from "@/src/context/user.provider";
import { useGetActiveUsers } from "@/src/hooks/user.hook";
import LoadingSection from "@/src/components/shared/LoadingSection";
import categories from "../../../../public/data/category.json";
import CategoryList from "@/src/features/category/CategoryList";
import Head from "next/head";
import { useRecipeProvider } from "@/src/context/recipes.providers";
import Browser from "@/src/components/shared/Browser";
import { IUser } from "@/src/types/user.type";
import "../../../styles/textPreview.css";
import Banner from "@/src/components/modules/home/Banner";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import MembersList from "@/src/features/follow/MembersList";

const Home = () => {
  const { user, isLoading: loadingUser } = useUser();

  const { isLoading: lodingActiveUsers, data: userData } = useGetActiveUsers(
    user?.email
  );

  const [hasMore, setHasMore] = useState(true);

  const {
    loadingRecipeCount,
    recipeCount,
    itemsPerPage,
    setItemsPerPage,
    loadingRecipes,
    recipeData,
    refetchAllRecipes,
    resetBrowser,
    resetPagination,
  } = useRecipeProvider();

  useEffect(() => {
    resetBrowser();
    resetPagination();
  }, []);

  const fetchData = () => {
    if (itemsPerPage <= recipeCount)
      setTimeout(() => {
        setItemsPerPage((prevItems) => prevItems + 5);
      }, 500);
    else {
      setHasMore(false);
    }
  };

  const [openMemberList, setOpenMemberList] = useState<boolean>(false);
  const [openCategoryList, setOpenCategoryList] = useState<boolean>(false);

  return (
    <Container>
      <Head>
        <title>Home | My Recipe Sharing Community</title>
      </Head>

      <div className="w-full min-h-screen py-4 space-y-6">
        <Banner />

        {/* ----------------------------------PC View---------------------------------- */}
        <div className="hidden h-[calc(100vh-40px)] lg:grid grid-cols-4 gap-6">
          <div className="w-full h-full col-span-1 p-3 overflow-y-auto backdrop-blur-md rounded-lg shadow-xl">
            <h1 className="text-2xl mb-3">Active Members</h1>
            <div className="w-full">
              {loadingUser || lodingActiveUsers ? (
                <LoadingSection />
              ) : (
                <MembersList userData={userData} loggedInUser={user as IUser} />
              )}
            </div>
          </div>

          <div
            id="scrollableDiv"
            className="w-full h-full col-span-2 p-3 overflow-y-auto backdrop-blur-md rounded-lg shadow-xl"
          >
            <h1 className="text-2xl mb-3">Recipe Feed</h1>

            <div className="w-full">
              <Browser
                categoryFilter={user?.userType === "PRO" ? true : false}
                contentTypeFilter={user?.userType === "PRO" ? true : false}
                sortBox={false}
              />
            </div>

            <div className="w-full">
              {loadingUser || loadingRecipeCount || loadingRecipes ? (
                <LoadingSection />
              ) : (
                <RecipeFeed
                  recipeData={
                    user?.role === "ADMIN"
                      ? recipeData.filter(
                          (recipe) => recipe?.status === "PUBLISHED"
                        )
                      : recipeData
                  }
                  fetchData={fetchData}
                  hasMore={hasMore}
                  refetchAllRecipes={refetchAllRecipes}
                />
              )}
            </div>
          </div>

          <div className="w-full h-full col-span-1 p-3 overflow-y-auto backdrop-blur-md rounded-lg shadow-xl">
            <h1 className="text-2xl mb-3">Popular Categories</h1>
            <div className="w-full">
              {loadingUser ? (
                <LoadingSection />
              ) : (
                <CategoryList categoryData={categories} />
              )}
            </div>
          </div>
        </div>

        {/* -------------------------Mobile and Tab View------------------------- */}
        <div className="h-[calc(100vh-40px)] relative flex flex-col lg:flex-row lg:hidden overflow-hidden">
          <div className="w-full flex justify-end items-center gap-6 p-5 lg:hidden z-20 bg-default-100 rounded-lg mb-6">
            <FaUsers
              className="text-2xl text-red-700"
              onClick={() => setOpenMemberList(!openMemberList)}
            />
            <BiSolidCategory
              className="text-2xl text-red-700"
              onClick={() => setOpenCategoryList(!openCategoryList)}
            />
          </div>

          <div
            className={`w-64 h-full p-2 overflow-y-auto bg-white rounded-lg absolute lg:fixed z-20 lg:translate-x-0 ${
              openMemberList
                ? `translate-x-0 transition duration-300 ease-in-out`
                : `-translate-x-full transition duration-300 ease-in-out`
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl">Active Members</h1>
              <FaXmark
                className="text-2xl text-red-700"
                onClick={() => setOpenMemberList(false)}
              />
            </div>
            <div className="w-full">
              {loadingUser || lodingActiveUsers ? (
                <LoadingSection />
              ) : (
                <MembersList userData={userData} loggedInUser={user as IUser} />
              )}
            </div>
          </div>

          <div
            className={`w-64 h-full p-2 overflow-y-auto bg-white rounded-lg  absolute lg:fixed z-20 lg:translate-x-0 ${
              openCategoryList
                ? `translate-x-0 transition duration-300 ease-in-out`
                : `-translate-x-full transition duration-300 ease-in-out`
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl">Popular Categories</h1>
              <FaXmark
                className="text-2xl text-red-700"
                onClick={() => setOpenCategoryList(false)}
              />
            </div>
            <div className="w-full">
              {loadingUser ? (
                <LoadingSection />
              ) : (
                <CategoryList categoryData={categories} />
              )}
            </div>
          </div>

          <div
            id="scrollableDiv"
            className="w-full h-full overflow-y-auto backdrop-blur-md rounded-lg"
          >
            <h1 className="text-2xl mb-3">Recipe Feed</h1>

            <div className="w-full">
              <Browser
                categoryFilter={user?.userType === "PRO" ? true : false}
                contentTypeFilter={user?.userType === "PRO" ? true : false}
                sortBox={false}
              />
            </div>

            <div className="w-full">
              {loadingUser || loadingRecipeCount || loadingRecipes ? (
                <LoadingSection />
              ) : (
                <RecipeFeed
                  recipeData={
                    user?.role === "ADMIN"
                      ? recipeData.filter(
                          (recipe) => recipe?.status === "PUBLISHED"
                        )
                      : recipeData
                  }
                  fetchData={fetchData}
                  hasMore={hasMore}
                  refetchAllRecipes={refetchAllRecipes}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
