"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/src/config/site";
// import { ThemeSwitch } from "@/src/components/theme-switch";
import NavbarDropDown from "./NavbarDropDown";
import { useUser } from "@/src/context/user.provider";
import MainLogo from "../../shared/MainLogo";
import { logout } from "@/src/services/AuthService";
import { protectedRoutes } from "@/src/constant";
import { usePathname, useRouter } from "next/navigation";

export const Navbar = () => {
  const { user, setIsLoading: userLoading } = useUser();
  const router = useRouter();
  const pathName = usePathname();

  const dashboardLink = {
    label: "Dashboard",
    href:
      user?.role === "ADMIN"
        ? "/admin-dashboard/all-recipes"
        : "/user-dashboard/my-recipes",
  };

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathName.match(route))) {
      router.push("/");
    }
  };

  return (
    <NextUINavbar
      maxWidth="2xl"
      shouldHideOnScroll
      className="px-5 md:px-8 lg:px-10"
    >
      {/*  -------------------------- Pc,Tab and small device view --------------------------  */}

      {/* first half of navbar conating brand logo and links */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {/* <Logo /> */}
            <MainLogo caller={"n"} />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}

          {user && (
            <NavbarItem key={dashboardLink.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={dashboardLink.href}
              >
                {dashboardLink.label}
              </NextLink>
            </NavbarItem>
          )}
        </ul>
      </NavbarContent>

      {/* second half of navbar containing theme switcher */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <ThemeSwitch /> */}
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          {user?.email ? (
            <NavbarDropDown />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      {/*  -------------------------- Mobile View --------------------------  */}

      {/* second half of navbar containing theme switcher and menu button*/}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      {/* menu drop down */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          {user ? (
            <>
              <NavbarMenuItem key={dashboardLink.href}>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={dashboardLink.href}
                  size="lg"
                >
                  {dashboardLink.label}
                </Link>
              </NavbarMenuItem>

              <NavbarMenuItem
                key="logout"
                className="text-danger"
                onClick={() => handleLogout()}
              >
                Logout
              </NavbarMenuItem>
            </>
          ) : (
            <NavbarMenuItem key="login">
              <Link href="/login">Login</Link>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
