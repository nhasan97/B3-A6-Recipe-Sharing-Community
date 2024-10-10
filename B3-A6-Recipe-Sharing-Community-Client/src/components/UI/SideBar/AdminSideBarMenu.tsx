// import "../../../cssStyles/Sidebar.css";

import { BiSolidCategory } from "react-icons/bi";
import SidebarMenuItem from "./SidebarMenuItem";

const AdminSideBarMenu = () => {
  return (
    <div className="sb flex flex-col justify-center items-start mx-auto">
      <SidebarMenuItem
        icon={<i className="fa-solid fa-seedling" />}
        menuText="All Recipes"
        route="/admin-dashboard/all-recipes"
      />

      <SidebarMenuItem
        icon={<BiSolidCategory />}
        menuText="All Users"
        route="/admin-dashboard/all-users"
      />

      <SidebarMenuItem
        icon={<BiSolidCategory />}
        menuText="All Admins"
        route="/admin-dashboard/all-admins"
      />

      <SidebarMenuItem
        icon={<BiSolidCategory />}
        menuText="Add Admin"
        route="/admin-dashboard/add-admin"
      />

      <SidebarMenuItem
        icon={<BiSolidCategory />}
        menuText="Profile"
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
