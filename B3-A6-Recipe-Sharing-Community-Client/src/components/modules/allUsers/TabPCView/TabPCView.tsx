import { IUser } from "@/src/types/user.type";
import React from "react";
import UserTableRow from "./UserTableRow";

const TabPCView = ({ userData }: { userData: { data: IUser[] } }) => {
  return (
    <div className="bg-white hidden sm:block w-full h-[80%] overflow-y-auto rounded-lg border">
      {userData!.data?.length > 0 ? (
        <table className="w-full">
          {/* head */}
          <thead>
            <tr className="flex  justify-between items-center text-[#757575] p-5 border-b">
              <th className="flex-1">Image</th>
              <th className="flex-1">Name</th>
              <th className="flex-1">Email</th>
              <th className="flex-1">Cell</th>
              <th className="flex-1">Status</th>
              <th className="flex-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}
            {userData!.data?.map((user: IUser) => (
              <UserTableRow key={user?._id} user={user} />
            ))}
          </tbody>
        </table>
      ) : (
        ""
        // <NoData text={"No Products Found"}></NoData>
      )}
    </div>
  );
};

export default TabPCView;
