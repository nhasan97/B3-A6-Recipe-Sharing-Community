"use client";

import { useChangeUserStatus } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types/user.type";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { toast } from "sonner";

const MobileViewUserCard = ({ user }: { user: IUser }) => {
  const { mutate: handleChangeUserStatus } = useChangeUserStatus();

  const handleBlockUnblockUser = (status: string) => {
    toast.warning("Are you sure to change user status?", {
      action: {
        label: "Yes",
        onClick: () => {
          try {
            const res = handleChangeUserStatus({
              userId: user?._id,
              status,
            });
          } catch (err: any) {
            toast.error(err.data.message, { duration: 2000 });
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.info("Cancelled!", { duration: 2000 }),
      },
    });
  };
  return (
    <div className="h-fit  bg-white rounded-md shadow-md">
      <div className=" p-5 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Badge content={user?.status} color="primary">
              <Image
                src={user?.profilePhoto}
                className="size-14 p-[2px] border-2 border-[#5D7E5F] rounded-full"
              />
            </Badge>
            <h2 className=" text-[#5D7E5F] font-semibold ">{user?.name}</h2>
          </div>
          {user?.status === "ACTIVE" && (
            <Button onClick={() => handleBlockUnblockUser("BLOCKED")}>
              Block
            </Button>
          )}
          {user?.status === "BLOCKED" && (
            <Button onClick={() => handleBlockUnblockUser("ACTIVE")}>
              Unblock
            </Button>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p>Email: {user?.email}</p>
          <p>Cell: {user?.mobileNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default MobileViewUserCard;
