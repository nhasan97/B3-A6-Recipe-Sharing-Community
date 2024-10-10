import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import MobileView from "@/src/components/modules/allAdmins/MobileView/MobileView";
import TabPCView from "@/src/components/modules/allAdmins/TabPCView/TabPCView";
import axiosInstance from "@/src/lib/AxiosInstance";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import React from "react";

const AllAdminsPage = async () => {
  const { data: userData } = await axiosInstance.get("/users/admins");

  return (
    <div className="h-screen">
      <DashboardContainer>
        {/* <Helmet>
            <title>Blooms & Beyond | Dashboard | Products</title>
          </Helmet> */}

        {/* <Title title={"Products"}></Title> */}

        <Link href="/admin-dashboard/add-admin" className="self-start mb-6">
          <Button>Add Admin</Button>
        </Link>

        {/*tab pc view */}
        <TabPCView userData={userData} />

        {/* mobile view */}
        <MobileView userData={userData} />
      </DashboardContainer>
    </div>
  );
};

export default AllAdminsPage;
