import { TTitleProp } from "@/src/types/title.type";
import React from "react";

const PageTitle = ({ title }: TTitleProp) => {
  return (
    <div className="w-full text-center space-y-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl">{title.mainTitle}</h2>
      <p className="text-base md:text-xl text-[#757575]">{title.subTitle}</p>
    </div>
  );
};

export default PageTitle;
