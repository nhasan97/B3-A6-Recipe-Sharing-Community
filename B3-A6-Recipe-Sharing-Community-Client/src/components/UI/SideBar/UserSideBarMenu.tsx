// import "../../../cssStyles/Sidebar.css";

import { RiUserSettingsFill } from "react-icons/ri";
import SidebarMenuItem from "./SidebarMenuItem";
import { GiCampCookingPot } from "react-icons/gi";
import { MdCardMembership } from "react-icons/md";

const UserSideBarMenu = () => {
  return (
    <div className="sb flex flex-col justify-center items-start mx-auto">
      <SidebarMenuItem
        icon={<GiCampCookingPot className="text-xl" />}
        menuText="My Recipes"
        route="/user-dashboard/my-recipes"
      />

      <SidebarMenuItem
        icon={<i className="fa-solid fa-share" />}
        menuText="Share Recipe"
        route="/user-dashboard/share-recipe"
      />

      <SidebarMenuItem
        icon={<RiUserSettingsFill className="text-xl" />}
        menuText="Profile Settings"
        route="/user-dashboard/user-profile"
      />

      <SidebarMenuItem
        icon={<MdCardMembership className="text-xl" />}
        menuText="Get Membership"
        route="/user-dashboard/get-membership"
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
