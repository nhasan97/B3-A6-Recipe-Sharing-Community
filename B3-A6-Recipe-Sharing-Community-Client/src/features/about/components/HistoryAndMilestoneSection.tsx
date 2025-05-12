import React from "react";
import milestones from "../../../../public/data/milestones.json";
import MilestoneCard from "./MilestoneCard";

const HistoryAndMilestoneSection = () => {
  return (
    <div className="w-full xl:w-3/4 mx-auto md:bg-[url('/assets/images/about-history-bg.png')] bg-cover bg-center bg-no-repeat">
      <h1 className="text-lg md:text-2xl text-center font-semibold my-12">
        History & Milestones
      </h1>
      <div className="w-full  mx-auto">
        {milestones.map((milestone, index) => (
          <MilestoneCard
            key={milestone.milestoneName}
            milestone={milestone}
            flexclass={index % 2 === 1 ? "flex-row-reverse" : ""}
            imageJustifyclass={
              index % 2 === 1 ? "justify-start" : "justify-end"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryAndMilestoneSection;
