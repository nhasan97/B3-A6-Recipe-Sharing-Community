"use client";

import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { useUser } from "@/src/context/user.provider";
import UserSideBarMenu from "./UserSideBarMenu";
import AdminSideBarMenu from "./AdminSideBarMenu";
import MainLogo from "../../shared/MainLogo";
import { Image } from "@nextui-org/image";
import { IUser } from "@/src/types/user.type";
import { Button } from "@nextui-org/button";
import { logout } from "@/src/services/AuthService";
import { protectedRoutes } from "@/src/constant";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user, setIsLoading: userLoading } = useUser();
  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathName.match(route))) {
      router.push("/");
    }
  };

  return (
    <div>
      <div className="w-full flex justify-end items-center p-5 lg:hidden fixed z-20">
        <HiMenuAlt3
          className="text-2xl text-red-700"
          onClick={() => setOpenSidebar(!openSidebar)}
        />
      </div>
      {/* bg-[url('/sidebarBg.png')] bg-no-repeat bg-center bg-cover */}
      <div
        className={`w-64 h-full bg-gradient-to-b from-red-700 via-red-950 to-[#121213] overflow-y-auto rounded-r-xl shadow-xl absolute lg:fixed z-20 lg:translate-x-0 ${
          openSidebar
            ? `translate-x-0 transition duration-300 ease-in-out`
            : `-translate-x-full transition duration-300 ease-in-out`
        }`}
      >
        <div className="w-full py-6">
          <MainLogo caller={"d"} />
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-3 ">
          <div className="relative">
            <Image
              src={user?.profilePhoto}
              alt="Users Profile Photo"
              className="size-[150px] mx-auto object-fill object-center"
              isBlurred
            />

            {/* <div className="size-6 bg-green-700 border-4 border-white rounded-full absolute right-0 bottom-2" /> */}
          </div>

          <div className="text-center">
            <h1 className="normal-case text-xl sm:text-2xl text-white font-medium">
              {user?.name}
            </h1>

            {user?.userType === "PRO" && (
              <div className="flex items-center gap-1 text-white text-sm">
                (
                <Image
                  src={"/assets/icons/premium-2.png"}
                  alt="Users Profile Photo"
                  className="size-[20px] mx-auto object-fill object-center"
                  isBlurred
                />
                <p>Premium User</p>)
              </div>
            )}
          </div>

          <p className="normal-case text-base sm:text-lg text-[#949494]">
            {user?.email}
          </p>
        </div>

        <div className="flex flex-col justify items-start text-[#c5c5c5] p-6">
          {user?.role === "ADMIN" ? (
            <AdminSideBarMenu />
          ) : (
            <UserSideBarMenu user={user as IUser} />
          )}
        </div>

        <div className="flex justify-center">
          <Button className="w-3/4" onClick={handleLogout}>
            Logout <i className="fa-solid fa-right-from-bracket" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
