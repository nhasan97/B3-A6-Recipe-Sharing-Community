import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import MobileView from "@/src/components/modules/allUsers/MobileView/MobileView";
import TabPCView from "@/src/components/modules/allUsers/TabPCView/TabPCView";
import axiosInstance from "@/src/lib/AxiosInstance";
import React from "react";

const AllUsersPage = async () => {
  const { data: userData } = await axiosInstance.get("/users");

  return (
    <div className="h-screen">
      <DashboardContainer>
        {/* <Helmet>
          <title>Blooms & Beyond | Dashboard | Products</title>
        </Helmet> */}

        {/* <Title title={"Products"}></Title> */}

        {/*tab pc view */}
        <TabPCView userData={userData} />

        {/* mobile view */}
        <MobileView userData={userData} />
      </DashboardContainer>
    </div>
  );
};

export default AllUsersPage;
