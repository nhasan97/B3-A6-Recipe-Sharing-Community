import { TChildren } from "@/src/types/children.type";
import React from "react";

const layout = ({ children }: TChildren) => {
  return (
    <div>
      <div className="relative flex flex-col justify-center h-screen">
        {/* <Navbar /> */}
        <main>{children}</main>
      </div>
    </div>
  );
};

export default layout;
