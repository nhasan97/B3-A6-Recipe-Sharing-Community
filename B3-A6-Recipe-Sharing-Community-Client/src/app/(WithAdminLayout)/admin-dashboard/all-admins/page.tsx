"use client";

import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import AddAdminModal from "@/src/components/modals/AddAdminModal";
import MobileView from "@/src/components/modules/allAdmins/MobileView/MobileView";
import TabPCView from "@/src/components/modules/allAdmins/TabPCView/TabPCView";
import DashboardPageTitle from "@/src/components/shared/DashboardPageTitle";
import LoadingSection from "@/src/components/shared/LoadingSection";
import PageTitle from "@/src/components/shared/PageTitle";
import { useGetAllAdmins } from "@/src/hooks/user.hook";
import React from "react";

const AllAdminsPage = () => {
  const {
    isLoading: loadingUserData,
    data: userData,
    refetch: refetchAdmins,
  } = useGetAllAdmins();

  const title = {
    mainTitle: "Admin List",
  };

  return (
    <div className="h-screen bg-[url('/assets/images/users-bg-mobile.png')] md:bg-[url('/assets/images/users-bg-tab.png')] xl:bg-[url('/assets/images/admins-bg.png')] bg-cover bg-center bg-no-repeat">
      <DashboardContainer>
        <DashboardPageTitle title={title} />

        <AddAdminModal refetchAdmins={refetchAdmins} />

        {loadingUserData ? (
          <LoadingSection />
        ) : (
          <>
            {/*tab pc view */}
            <TabPCView userData={userData} refetchAdmins={refetchAdmins} />

            {/* mobile view */}
            <MobileView userData={userData} refetchAdmins={refetchAdmins} />
          </>
        )}
      </DashboardContainer>
    </div>
  );
};

export default AllAdminsPage;
