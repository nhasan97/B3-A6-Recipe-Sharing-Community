import Sidebar from "@/src/components/UI/SideBar/Sidebar";
import { TChildren } from "@/src/types/children.type";
import React from "react";

const layout = ({ children }: TChildren) => {
  return (
    <div className="relative flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 lg:ml-64 relative border">{children}</div>
    </div>
  );
};

export default layout;
