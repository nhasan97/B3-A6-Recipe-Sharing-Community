import Sidebar from "@/src/components/UI/SideBar/Sidebar";
import { TChildren } from "@/src/types/children.type";
import React from "react";

const layout = ({ children }: TChildren) => {
  // const navigate = useNavigate();
  // const handleGoBack = () => {
  //   navigate(-1);onClick={handleGoBack}
  // };

  return (
    <div className="relative flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 lg:ml-64 relative">
        <i className="fa-solid fa-arrow-left text-xl text-[#808080] hover:text-[#5D7E5F] absolute top-5 left-5 sm:top-5 md:left-10"></i>
        {children}
      </div>
    </div>
  );
};

export default layout;
