import { TTeamMemberProp } from "@/src/types/team.type";
import { Image } from "@nextui-org/image";

const TeamCard = ({ member }: TTeamMemberProp) => {
  const { imageUrl, name, designation, say } = member;
  return (
    <div className="bg-gradient-to-r from-[#121213] via-[#19191a] to-[#121213] text-white text-lg shadow-xl rounded-xl">
      <figure className="p-1">
        <Image
          removeWrapper
          src={imageUrl}
          alt="team photo"
          className="rounded-xl w-full h-[400px]"
        />
      </figure>
      <div className="p-3 space-y-2">
        <h2 className="capitalize text-lg md:text-xl  text-[rgba(255,255,255,0.78)] font-semibold">
          {name}
        </h2>
        <p className="text-sm md:text-base text-[#a5a5a5] text-justify font-medium">
          {designation}
        </p>
        <p className="text-sm md:text-base text-[#696969] text-justify">
          {say}
        </p>
      </div>
      <div className="w-3/4 mx-auto flex justify-center items-center gap-6 p-3 bg-red-700 translate-y-[50%] rounded-full">
        <i className="fa-brands fa-facebook hover:scale-125 hover:transition-all" />
        <i className="fa-brands fa-square-instagram hover:scale-125 hover:transition-all" />
        <i className="fa-brands fa-discord hover:scale-125 hover:transition-all" />
      </div>
    </div>
  );
};

export default TeamCard;
