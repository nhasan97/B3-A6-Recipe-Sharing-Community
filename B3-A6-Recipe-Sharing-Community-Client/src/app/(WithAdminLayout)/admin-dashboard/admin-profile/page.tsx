import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import EditProfileModal from "@/src/components/modals/EditProfileModal";
import axiosInstance from "@/src/lib/AxiosInstance";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import React from "react";

const AdminProfilePage = async () => {
  const { data: userData } = await axiosInstance.get(`/profile`);

  return (
    <div className="h-screen">
      <DashboardContainer>
        <div className="flex flex-col justify-center items-center gap-3">
          <Image
            alt="NextUI hero Image"
            src={userData?.data?.profilePhoto}
            className="size-[200px] rounded-full"
          />

          <h1 className="text-3xl">{userData?.data?.name}</h1>
          <p>{userData?.data?.email}</p>

          <p className="my-6">{userData?.data?.bio}</p>

          <div className="flex items-center gap-3">
            <p>Status : {userData?.data?.status}</p>
            <Divider orientation="vertical" />
            <p>Cell : {userData?.data?.mobileNumber}</p>
            <Divider orientation="vertical" />

            <EditProfileModal userData={userData} />
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AdminProfilePage;
