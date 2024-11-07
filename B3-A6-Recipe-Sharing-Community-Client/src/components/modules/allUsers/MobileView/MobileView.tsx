import { IUser } from "@/src/types/user.type";
import MobileViewUserCard from "./MobileViewUserCard";
import NoData from "@/src/components/shared/NoData";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

const MobileView = ({
  userData,
  refetchUsers,
}: {
  userData: { data: IUser[] };
  refetchUsers: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:hidden w-full h-[80%] overflow-y-auto rounded-lg">
      {userData!.data?.length > 0 ? (
        userData!.data?.map((user: IUser) => (
          <MobileViewUserCard
            key={user?._id}
            user={user}
            refetchUsers={refetchUsers}
          />
        ))
      ) : (
        <NoData text={"No Users Found"} />
      )}
    </div>
  );
};

export default MobileView;
