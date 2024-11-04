// import "../../../styles/Sidebar.css";
import { GiCampCookingPot } from "react-icons/gi";
import { RiAdminFill, RiUserSettingsFill } from "react-icons/ri";
import SidebarMenuItem from "./SidebarMenuItem";

const AdminSideBarMenu = () => {
  return (
    <div className="sb flex flex-col justify-center items-start mx-auto">
      <SidebarMenuItem
        icon={<GiCampCookingPot className="text-xl" />}
        menuText="All Recipes"
        route="/admin-dashboard/all-recipes"
      />

      <SidebarMenuItem
        icon={<i className="fa-solid fa-users" />}
        menuText="All Users"
        route="/admin-dashboard/all-users"
      />

      <SidebarMenuItem
        icon={<RiAdminFill className="text-xl" />}
        menuText="All Admins"
        route="/admin-dashboard/all-admins"
      />

      <SidebarMenuItem
        icon={<i className="fa-solid fa-user-tie" />}
        menuText="Add Admin"
        route="/admin-dashboard/add-admin"
      />

      <SidebarMenuItem
        icon={<RiUserSettingsFill className="text-xl" />}
        menuText="Profile Settings"
        route="/admin-dashboard/admin-profile"
      />

      <SidebarMenuItem
        icon={<i className="fa-solid fa-arrow-left" />}
        menuText="Back to Site"
        route="/"
      />
    </div>
  );
};

export default AdminSideBarMenu;
