"use client";

import { useChangeUserStatus } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types/user.type";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { toast } from "sonner";

const UserTableRow = ({ user }: { user: IUser }) => {
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
    <tr className="flex justify-between items-center text-[#808080] text-center p-5 border-b">
      <td className="flex-1 justify-between items-center">
        <Image
          src={user?.profilePhoto}
          className="size-14 mx-auto p-[2px] border-2 border-[#5D7E5F] rounded-full"
        />
      </td>

      <td className="flex-1 font-semibold text-[#5D7E5F]">{user?.name}</td>

      <td className="flex-1">{user?.email}</td>

      <td className="flex-1">{user?.mobileNumber}</td>

      <td className="flex-1">{user?.status}</td>

      <td className="flex-1">
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
      </td>
    </tr>
  );
};

export default UserTableRow;
