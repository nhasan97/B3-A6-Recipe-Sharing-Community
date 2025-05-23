import Sidebar from "@/src/components/layouts/SideBar/Sidebar";
import { TChildren } from "@/src/types/children.type";
import React from "react";

const layout = ({ children }: TChildren) => {
  return (
    <div className="relative flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 lg:ml-64 relative">{children}</div>
    </div>
  );
};

export default layout;
