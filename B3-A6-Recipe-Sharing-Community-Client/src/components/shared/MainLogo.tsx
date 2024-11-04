"use client";

import { Avatar } from "@nextui-org/avatar";

// ${caller === "f" ? "text-white" : "text-[rgba(255,255,255,0.75)]"}

const MainLogo = ({ caller }: { caller: string }) => {
  return (
    <div
      className={`text-xl flex items-center ${
        caller === "d"
          ? "w-full justify-center text-white"
          : "w-fit justify-start"
      }`}
    >
      <Avatar
        src="/assets/icons/home-kitchen-logo-removebg-preview.png"
        className="bg-transparent mr-1"
      />

      <p
        className={`font-medium text-inherit ${
          caller === "d" || caller === "f" ? "flex" : "hidden sm:flex"
        }`}
      >
        | Taste Tribe
      </p>
    </div>
  );
};

export default MainLogo;
