"use client";

import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import MobileView from "@/src/components/modules/profile/MobileView";
import TabPCView from "@/src/components/modules/profile/TabPCView";
import DashboardPageTitle from "@/src/components/shared/DashboardPageTitle";
import LoadingSection from "@/src/components/shared/LoadingSection";
import { useRecipeProvider } from "@/src/context/recipes.providers";
import {
  useGetLoggedInUserProfile,
  useGetUsersCount,
} from "@/src/hooks/user.hook";
import React from "react";

const AdminProfilePage = () => {
  const { isLoading: loadingUserData, data: userData } =
    useGetLoggedInUserProfile();

  const { isLoading: loadingUserCount, data: userCount } = useGetUsersCount();

  const { loadingRecipeCount, recipeCount } = useRecipeProvider();

  const title = {
    mainTitle: "Admin Profile",
  };

  return (
    <div className="h-screen">
      <DashboardContainer>
        <DashboardPageTitle title={title} />

        {loadingUserData || loadingUserCount || loadingRecipeCount ? (
          <LoadingSection />
        ) : (
          <div className="w-full h-full overflow-y-auto">
            {/*tab pc view */}
            <TabPCView
              userData={userData}
              count={{ data: { ...userCount.data, recipeCount } }}
            />

            {/* mobile view */}
            <MobileView
              userData={userData}
              count={{ data: { ...userCount.data, recipeCount } }}
            />
          </div>
        )}
      </DashboardContainer>
    </div>
  );
};

export default AdminProfilePage;
