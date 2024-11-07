"use client";

import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import MobileView from "@/src/components/modules/allUsers/MobileView/MobileView";
import TabPCView from "@/src/components/modules/allUsers/TabPCView/TabPCView";
import DashboardPageTitle from "@/src/components/shared/DashboardPageTitle";
import LoadingSection from "@/src/components/shared/LoadingSection";
import PageTitle from "@/src/components/shared/PageTitle";
import { useGetAllUsers } from "@/src/hooks/user.hook";
import React from "react";

const AllUsersPage = () => {
  const {
    isLoading: loadingUserData,
    data: userData,
    refetch: refetchUsers,
  } = useGetAllUsers();

  const title = {
    mainTitle: "All Users",
  };

  return (
    <div className="h-screen bg-[url('/assets/images/users-bg-mobile.png')] md:bg-[url('/assets/images/users-bg-tab.png')] xl:bg-[url('/assets/images/users-bg.png')] bg-cover bg-center bg-no-repeat">
      <DashboardContainer>
        <DashboardPageTitle title={title} />

        {loadingUserData ? (
          <LoadingSection />
        ) : (
          <>
            {/*tab pc view */}
            <TabPCView userData={userData} refetchUsers={refetchUsers} />

            {/* mobile view */}
            <MobileView userData={userData} refetchUsers={refetchUsers} />
          </>
        )}
      </DashboardContainer>
    </div>
  );
};

export default AllUsersPage;
