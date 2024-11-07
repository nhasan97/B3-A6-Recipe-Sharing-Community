import { IUser } from "@/src/types/user.type";
import { Image } from "@nextui-org/image";
import React from "react";
import EditProfileModal from "../../modals/EditProfileModal";
import ChangePasswordModal from "../../modals/ChangePasswordModal";
import { GiCampCookingPot } from "react-icons/gi";

const MobileView = ({
  userData,
  count,
}: {
  userData: { data: IUser };
  count: any;
}) => {
  return (
    //   ----------------------------------MobileView----------------------------------

    <div className="md:hidden w-full h-fit flex flex-col space-y-6 bg-[url('/assets/images/dashboard-recipes-bg-mobileTab.png')] bg-cover bg-center bg-no-repeat">
      <Image
        removeWrapper
        alt="NextUI hero Image"
        src={userData?.data?.profilePhoto}
        className="h-[250px] object-cover object-center"
      />

      <div className="space-y-6">
        <h1 className="text-3xl">{userData?.data?.name}</h1>

        <p>{userData?.data?.bio}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-envelope" />
            <p>{userData?.data?.email}</p>
          </div>

          <div className="flex items-center gap-2">
            <i className="fa-solid fa-phone" />
            <p>{userData?.data?.mobileNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 my-2">
          Status | <p>{userData?.data?.status}</p>
        </div>
      </div>

      <div className="space-x-2">
        <EditProfileModal userData={userData} />
        <ChangePasswordModal />
      </div>

      {userData?.data?.role === "ADMIN" ? (
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="w-full bg-[#6C6555] backdrop-blur-md p-3 text-white text-center space-y-2 rounded-lg shadow-lg">
            <p className="text-3xl">{count?.data?.users}</p>
            <p className="text-xs">Active Platform Users</p>
          </div>

          <div className="w-full bg-[#6C6555] backdrop-blur-md p-3 text-white text-center space-y-2 rounded-lg shadow-lg">
            <p className="text-3xl">{count?.data?.admins}</p>
            <p className="text-xs">Admins</p>
          </div>

          <div className="w-full bg-[#6C6555] backdrop-blur-md p-3 text-white text-center space-y-2 rounded-lg shadow-lg">
            <p className="text-3xl">{count?.data?.recipeCount}</p>
            <p className="text-xs">Total Recipes</p>
          </div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="w-full bg-[#6C6555] backdrop-blur-md p-3 text-white text-center space-y-2 rounded-lg shadow-lg">
            <p className="text-3xl">{userData?.data?.followers?.length}</p>
            <p className="text-xs">Followers</p>
          </div>

          <div className="w-full bg-[#6C6555] backdrop-blur-md p-3 text-white text-center space-y-2 rounded-lg shadow-lg">
            <p className="text-3xl">{userData?.data?.following?.length}</p>
            <p className="text-xs">Following</p>
          </div>

          <div className="w-full bg-[#6C6555] backdrop-blur-md p-3 text-white text-center space-y-2 rounded-lg shadow-lg">
            <GiCampCookingPot className="hidden 2xl:flex text-7xl" />
            <p className="text-3xl">{count?.data?.publishedRecipes}</p>
            <p className="text-xs">Published Recipes</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileView;
