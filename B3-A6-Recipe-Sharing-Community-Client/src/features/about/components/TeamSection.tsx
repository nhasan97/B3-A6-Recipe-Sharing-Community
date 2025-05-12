import React from "react";
import members from "../../../../public/data/team.json";
import { TTeamMember } from "../types/team.type";
import TeamCard from "./TeamCard";

const TeamSection = () => {
  return (
    <div className="w-full xl:w-3/4 mx-auto">
      <h1 className="text-lg md:text-2xl text-center font-semibold mb-6">
        Our Team
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6">
        {members.map((member: TTeamMember) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
