import { Image } from "@nextui-org/image";
import React from "react";

const MilestoneCard = ({
  milestone,
  flexclass,
  imageJustifyclass,
}: {
  milestone: {
    milestoneName: string;
    milestoneDescription: string;
    milestoneCardIcon: string;
    lineImage: string;
  };
  flexclass: string;
  imageJustifyclass: string;
}) => {
  return (
    <div className={`flex ${flexclass}`}>
      <div className={`w-1/2 flex ${imageJustifyclass} pt-14`}>
        <Image removeWrapper src={milestone?.lineImage} alt="" className="" />
      </div>

      <div className="w-1/2">
        <div className=" bg-black/10 backdrop-blur-md flex flex-col gap-3 p-3 text-justify shadow-lg rounded-lg border">
          <div className="flex items-center gap-2">
            <i
              className={`${milestone.milestoneCardIcon} text-red-700 text-2xl `}
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
