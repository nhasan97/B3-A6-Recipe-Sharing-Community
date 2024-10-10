import axiosInstance from "@/src/lib/AxiosInstance";
import { IUser } from "@/src/types/user.type";
import React from "react";
import MembersListCard from "../../UI/MembersListCard";
// import { useUser } from "@/src/context/user.provider";
import { getCurrentUser } from "@/src/services/AuthService";

const MembersList = async () => {
  const user = await getCurrentUser();
  const { data } = await axiosInstance.get(
    `/users/without/blocked/${user?.email}`
  );

  return (
    <div className="">
      <h1>Active Members</h1>
      <div>
        {data?.data
          // ?.filter((member) => member?.email !== user?.email)
          .map((member: IUser) => (
            <MembersListCard key={member._id} member={member} />
          ))}
      </div>
    </div>
  );
};

export default MembersList;
