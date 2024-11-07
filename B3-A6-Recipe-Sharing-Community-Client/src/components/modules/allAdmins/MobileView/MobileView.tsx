import { IUser } from "@/src/types/user.type";
import MobileViewUserCard from "./MobileViewUserCard";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import NoData from "@/src/components/shared/NoData";

const MobileView = ({
  userData,
  refetchAdmins,
}: {
  userData: { data: IUser[] };
  refetchAdmins: (
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
            refetchAdmins={refetchAdmins}
          />
        ))
      ) : (
        <NoData text={"No Admin Found"} />
      )}
    </div>
  );
};

export default MobileView;
