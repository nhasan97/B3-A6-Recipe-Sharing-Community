import { IUser } from "@/src/types/user.type";
import React from "react";
import MembersListCard from "../../UI/MembersListCard";
import NoData from "../../shared/NoData";

const MembersList = ({
  userData,
  loggedInUser,
}: {
  userData: { data: IUser[] };
  loggedInUser: IUser;
}) => {
  return (
    <div className="space-y-3">
      {userData?.data.length ? (
        userData?.data.map((member: IUser) => (
          <MembersListCard
            key={member._id}
            member={member}
            loggedInUser={loggedInUser}
          />
        ))
      ) : (
        <NoData text={"No Active Users"} />
      )}
    </div>
  );
};

export default MembersList;
