import { IUser } from "@/src/types/user.type";
import { Image } from "@nextui-org/image";
import React from "react";
import EditProfileModal from "../../modals/EditProfileModal";
import ChangePasswordModal from "../../modals/ChangePasswordModal";
import { FaUsers } from "react-icons/fa";
import { GiCampCookingPot, GiShadowFollower } from "react-icons/gi";
import { SlUserFollowing } from "react-icons/sl";

const TabPCView = ({
  userData,
  count,
}: {
  userData: { data: IUser };
  count: any;
}) => {
  return (
    //----------------------------------TabPCView----------------------------------

    <div
      style={{ backgroundImage: `url(${userData?.data?.profilePhoto})` }}
      className={`hidden md:flex justify-center items-center w-full h-full bg-cover bg-center bg-no-repeat bg-[#000000af] bg-blend-overlay rounded-lg`}
    >
      <div className="w-full h-full flex justify-center items-center gap-6 p-5 rounded-lg">
        <div className="w-1/2 h-full flex flex-col gap-6 bg-white/20 backdrop-blur-md p-5 rounded-lg">
          <Image
            removeWrapper
            alt="NextUI hero Image"
            src={userData?.data?.profilePhoto}
            className="h-[200px] 2xl:h-[550px] object-cover object-center"
          />

          <div className="text-[#c5c5c5] space-y-6">
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

            {/* <div className="flex items-center gap-2 my-2">
          Status | <p>{userData?.data?.status}</p>
        </div> */}
          </div>

          <div className="space-x-2">
            <EditProfileModal userData={userData} />
            <ChangePasswordModal />
          </div>
        </div>

        {userData?.data?.role === "ADMIN" ? (
          <div className="w-1/2 h-full grid grid-cols-1 gap-6">
            <div className="w-full bg-white/20 backdrop-blur-md flex flex-col justify-center items-center py-6 px-4 text-white text-center space-y-2 rounded-lg shadow-lg">
              <FaUsers className="hidden 2xl:flex text-7xl" />
              <p className="text-6xl">{count?.data?.users}</p>
              <p>Active Platform Users</p>
            </div>

            <div className="w-full bg-white/20 backdrop-blur-md flex flex-col justify-center items-center py-6 px-4 text-white text-center space-y-2 rounded-lg shadow-lg">
              <FaUsers className="hidden 2xl:flex text-7xl" />
              <p className="text-6xl">{count?.data?.admins}</p>
              <p>Admins</p>
            </div>

            <div className="w-full bg-white/20 backdrop-blur-md flex flex-col justify-center items-center py-6 px-4 text-white text-center space-y-2 rounded-lg shadow-lg">
              <GiCampCookingPot className="hidden 2xl:flex text-7xl" />
              <p className="text-6xl">{count?.data?.recipeCount}</p>
              <p>Total Recipes</p>
            </div>
          </div>
        ) : (
          <div className="w-1/2 h-full grid grid-cols-1 gap-6">
            <div className="w-full bg-white/20 backdrop-blur-md flex flex-col justify-center items-center py-6 text-white text-center space-y-2 rounded-lg shadow-lg">
              <GiShadowFollower className="hidden 2xl:flex text-7xl" />
              <p className="text-6xl">{userData?.data?.followers?.length}</p>
              <p>Followers</p>
            </div>
            <div className="w-full bg-white/20 backdrop-blur-md flex flex-col justify-center items-center py-6 px-4 text-white space-y-2 rounded-lg shadow-lg">
              <SlUserFollowing className="hidden 2xl:flex text-7xl" />
              <p className="text-6xl">{userData?.data?.following?.length}</p>
              <p>Following</p>
            </div>
            <div className="w-full bg-white/20 backdrop-blur-md flex flex-col justify-center items-center py-6 px-4 text-white text-center space-y-2 rounded-lg shadow-lg">
              <GiCampCookingPot className="hidden 2xl:flex text-7xl" />
              <p className="text-6xl">{count?.data?.publishedRecipes}</p>
              <p>Published Recipes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabPCView;
