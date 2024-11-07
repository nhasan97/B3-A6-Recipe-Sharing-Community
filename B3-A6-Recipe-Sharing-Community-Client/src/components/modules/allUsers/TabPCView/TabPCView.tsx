import { IUser } from "@/src/types/user.type";
import React from "react";
import UserTableRow from "./UserTableRow";
import NoData from "@/src/components/shared/NoData";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

const TabPCView = ({
  userData,
  refetchUsers,
}: {
  userData: { data: IUser[] };
  refetchUsers: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  return (
    <div className="bg-black/20 backdrop-blur-lg hidden sm:block w-full h-[80%] mt-6 overflow-y-auto rounded-lg border">
      {userData!.data?.length > 0 ? (
        <table className="w-full">
          {/* head */}
          <thead>
            <tr className="flex justify-between items-center text-[#121213] text-lg p-5 border-b">
              <th className="w-[40%] xl:flex-1">User</th>
              <th className="w-[20%] xl:flex-1">Cell</th>
              <th className="w-[20%] xl:flex-1">Status</th>
              <th className="w-[20%] xl:flex-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}
            {userData!.data?.map((user: IUser) => (
              <UserTableRow
                key={user?._id}
                user={user}
                refetchUsers={refetchUsers}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <NoData text={"No Users Found"} />
      )}
    </div>
  );
};

export default TabPCView;
