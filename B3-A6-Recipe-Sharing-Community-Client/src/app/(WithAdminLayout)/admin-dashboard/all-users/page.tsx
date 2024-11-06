"use client";

import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import MobileView from "@/src/components/modules/allUsers/MobileView/MobileView";
import TabPCView from "@/src/components/modules/allUsers/TabPCView/TabPCView";
import LoadingSection from "@/src/components/shared/LoadingSection";
import PageTitle from "@/src/components/shared/PageTitle";
import { useGetAllUsers } from "@/src/hooks/user.hook";
import React from "react";

const AllUsersPage = async () => {
  const { isLoading: loadingUserData, data: userData } = useGetAllUsers();

  const title = {
    mainTitle: "All Users",
  };

  return (
    <div className="h-screen bg-[url('/assets/images/users-bg-mobile.png')] md:bg-[url('/assets/images/users-bg-tab.png')] xl:bg-[url('/assets/images/users-bg.png')] bg-cover bg-center bg-no-repeat">
      <DashboardContainer>
        <PageTitle title={title} />

        {loadingUserData ? (
          <LoadingSection />
        ) : (
          <>
            <TabPCView userData={userData} />

            <MobileView userData={userData} />
          </>
        )}
      </DashboardContainer>
    </div>
  );
};

export default AllUsersPage;
