import { IUser } from "@/src/types/user.type";
import MobileViewUserCard from "./MobileViewUserCard";

const MobileView = ({ userData }: { userData: { data: IUser[] } }) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:hidden w-full h-[80%] overflow-y-auto rounded-lg">
      {
        userData!.data?.length > 0
          ? userData!.data?.map((user: IUser) => (
              <MobileViewUserCard key={user?._id} user={user} />
            ))
          : ""
        // <NoData text={"No Products Found"}></NoData>
      }
    </div>
  );
};

export default MobileView;
