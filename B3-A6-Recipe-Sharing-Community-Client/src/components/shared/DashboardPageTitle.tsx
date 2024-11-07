import { TTitleProp } from "@/src/types/title.type";
import React from "react";
import GoBackButton from "../UI/GoBackButton";

const DashboardPageTitle = ({ title }: TTitleProp) => {
  return (
    <div className="w-full flex items-center mb-6">
      <div>
        <GoBackButton />
      </div>
      <div className="text-left space-y-1">
        <h2 className="text-lg md:text-xl lg:text-2xl">{title.mainTitle}</h2>
        {title.subTitle && (
          <p className="text-xs md:text-sm text-[#757575]">{title.subTitle}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPageTitle;
