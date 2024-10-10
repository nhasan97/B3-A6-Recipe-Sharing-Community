"use client";

import { protectedRoutes } from "@/src/constant";
import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/AuthService";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";

const NavbarDropDown = () => {
  const router = useRouter();
  const { user, setIsLoading: userLoading } = useUser();
  const pathName = usePathname();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathName.match(route))) {
      router.push("/");
    }
  };

  const handleNavigation = (pathName: string) => {
    router.push(pathName);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" src={user?.profilePhoto} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="dashboard"
          onClick={() =>
            handleNavigation(
              user?.role === "ADMIN"
                ? "/admin-dashboard/all-recipes"
                : "/user-dashboard/my-recipes"
            )
          }
        >
          Dashboard
        </DropdownItem>

        {/* <DropdownItem
          key="shareRecipe"
          onClick={() => handleNavigation("/user-dashboard/share-recipe")}
        >
          Share Recipe
        </DropdownItem> */}

        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={() => handleLogout()}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropDown;
