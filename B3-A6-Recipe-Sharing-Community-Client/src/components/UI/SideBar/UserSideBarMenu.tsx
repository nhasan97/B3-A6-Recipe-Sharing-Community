// import "../../../cssStyles/Sidebar.css";

import { BiSolidCategory } from "react-icons/bi";
import SidebarMenuItem from "./SidebarMenuItem";

const UserSideBarMenu = () => {
  return (
    <div className="sb flex flex-col justify-center items-start mx-auto">
      <SidebarMenuItem
        icon={<i className="fa-solid fa-seedling" />}
        menuText="My Recipes"
        route="/user-dashboard/my-recipes"
      />

      <SidebarMenuItem
        icon={<BiSolidCategory />}
        menuText="Share Recipe"
        route="/user-dashboard/share-recipe"
      />

      <SidebarMenuItem
        icon={<i className="fa-solid fa-arrow-left" />}
        menuText="Back to Site"
        route="/"
      />
    </div>
  );
};

export default UserSideBarMenu;
