"use client";

import { protectedRoutes } from "@/src/constant";
import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/AuthService";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { usePathname, useRouter } from "next/navigation";

const NavbarDropDown = () => {

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

  const handleNavigation = (pathName: string) => {
    router.push(pathName);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: user?.profilePhoto,
          }}
          className="transition-transform"
          description={`@${user?.name.toLowerCase()}`}
          name={`${user?.name}`}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>

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
          key="logout"
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
