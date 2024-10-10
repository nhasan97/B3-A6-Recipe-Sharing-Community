import { TSidebarMenuItemProps } from "@/src/types/sidebar.type";
import Link from "next/link";

const SidebarMenuItem = ({ icon, menuText, route }: TSidebarMenuItemProps) => {
  return (
    <Link
      href={route}
      className="flex justify-center items-center gap-3 p-2 text-base sm:text-lg hover:text-[#5D7E5F] transition duration-150 relative"
    >
      {icon}
      {menuText}
    </Link>
  );
};

export default SidebarMenuItem;
