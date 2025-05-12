import { Image } from "@nextui-org/image";
import React from "react";
import { TMilestone } from "../types";

const MilestoneCard = ({
  milestone,
  flexclass,
  imageJustifyclass,
}: {
  milestone: TMilestone;
  flexclass: string;
  imageJustifyclass: string;
}) => {
  return (
    <div className={`flex ${flexclass}`}>
      <div className={`w-1/2 flex ${imageJustifyclass} pt-14`}>
        <Image
          removeWrapper
          src={milestone?.lineImage || "No Image Found"}
          alt="Mile Stone Image"
        />
      </div>

      <div className="w-1/2">
        <div className=" bg-black/10 backdrop-blur-md flex flex-col gap-3 p-3 text-justify shadow-lg rounded-lg border">
          <div className="flex items-center gap-2">
            <i
              className={`${milestone.milestoneCardIcon} text-red-700 text-2xl `}
              aria-hidden="true"
            />
            <h3 className="text-[#303030] font-medium">
              {milestone.milestoneName}
            </h3>
          </div>
          <p className="text-sm md:text-base text-[#4d4d4d]">
            {milestone.milestoneDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MilestoneCard;
