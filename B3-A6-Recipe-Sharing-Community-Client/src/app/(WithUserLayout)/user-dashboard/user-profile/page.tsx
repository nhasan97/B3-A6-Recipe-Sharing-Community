"use client";

import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import MobileView from "@/src/components/modules/profile/MobileView";
import TabPCView from "@/src/components/modules/profile/TabPCView";
import DashboardPageTitle from "@/src/components/shared/DashboardPageTitle";
import LoadingSection from "@/src/components/shared/LoadingSection";
import { useGetUsersRecipeCount } from "@/src/features/recipe/hooks/getUsersRecipeCountHook";
import { useGetLoggedInUserProfile } from "@/src/hooks/user.hook";
import React from "react";

const UserProfilePage = () => {
  const { isLoading: loadingUserData, data: userData } =
    useGetLoggedInUserProfile();

  const { isLoading: loadingUsersRecipeCount, data: usersRecipeCount } =
    useGetUsersRecipeCount(userData?.data?._id);

  const title = {
    mainTitle: "User Profile",
  };

  return (
    <div className="h-screen">
      <DashboardContainer>
        <DashboardPageTitle title={title} />

        {loadingUserData || loadingUsersRecipeCount ? (
          <LoadingSection />
        ) : (
          <div className="w-full h-full overflow-y-auto">
            {/*tab pc view */}
            <TabPCView userData={userData} count={usersRecipeCount} />

            {/* mobile view */}
            <MobileView userData={userData} count={usersRecipeCount} />
          </div>
        )}
      </DashboardContainer>
    </div>
  );
};

export default UserProfilePage;
