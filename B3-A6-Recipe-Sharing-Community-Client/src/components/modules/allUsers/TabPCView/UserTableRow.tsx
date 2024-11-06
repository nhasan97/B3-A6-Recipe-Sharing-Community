"use client";

import { useChangeUserStatus, useDeleleUser } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types/user.type";
import capitalizeFirstLetter from "@/src/utils/capitalizeFirstLetter";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { toast } from "sonner";
import { CgBlock, CgUnblock } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "@nextui-org/tooltip";
import { Spinner } from "@nextui-org/spinner";

const UserTableRow = ({ user }: { user: IUser }) => {
  // -------handling block/unblock user-------------------------------------------------------------------------

  const { mutate: handleChangeUserStatus, isPending: pendingChangeUserStatus } =
    useChangeUserStatus();

  const handleBlockUnblockUser = (status: string) => {
    toast.warning("Are you sure to change user status?", {
      action: {
        label: "Yes",
        onClick: () => {
          try {
            handleChangeUserStatus({
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

  // -------handling delete user-------------------------------------------------------------------------

  const { mutate: deleteUser, isPending: pendingDeleteUser } = useDeleleUser();

  const handleDeleteUser = () => {
    toast.warning(
      "Are you sure to delete user? You won't be able to revert this!",
      {
        action: {
          label: "Yes",
          onClick: () => {
            try {
              deleteUser({
                userId: user?._id,
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
      }
    );
  };

  return (
    <tr className="flex justify-between items-center text-[#292929] text-center p-5">
      <td className="w-[40%] xl:flex-1">
        <div className="flex items-center gap-3">
          <div>
            <Image
              src={user?.profilePhoto}
              alt="nextui logo"
              width={60}
              height={60}
              radius="sm"
              className="object-cover object-center"
              isBlurred
            />
          </div>
          <div className="text-left">
            <h1 className="font-semibold text-red-700">{user?.name}</h1>
            <p className="text-small">{user?.email}</p>
          </div>
        </div>
      </td>

      <td className="w-[20%] xl:flex-1">+{user?.mobileNumber}</td>

      <td className="w-[20%] xl:flex-1">
        <div
          className={`w-fit mx-auto px-3 py-1 ${
            user?.status === "ACTIVE"
              ? "bg-white/80 text-green-700"
              : "bg-white/80 text-red-700"
          } rounded-full`}
        >
          <p>{capitalizeFirstLetter(user?.status)}</p>
        </div>
      </td>

      <td className="w-[20%] xl:flex-1 space-x-2">
        {user?.status === "ACTIVE" && (
          <Tooltip content="Block User">
            <Button
              className="bg-white/80 text-red-700"
              onClick={() => handleBlockUnblockUser("BLOCKED")}
              isIconOnly
            >
              {pendingChangeUserStatus ? (
                <Spinner size="sm" color="danger" />
              ) : (
                <CgBlock className="text-2xl" />
              )}
            </Button>
          </Tooltip>
        )}
        {user?.status === "BLOCKED" && (
          <Tooltip content="Unblock User">
            <Button
              className="bg-white/80 text-green-700"
              onClick={() => handleBlockUnblockUser("ACTIVE")}
              isIconOnly
            >
              {pendingChangeUserStatus ? (
                <Spinner size="sm" color="success" />
              ) : (
                <CgUnblock className="text-2xl" />
              )}
            </Button>
          </Tooltip>
        )}

        <Button
          className="bg-white/80 text-red-700"
          onClick={() => handleDeleteUser()}
          isIconOnly
        >
          {pendingDeleteUser ? (
            <Spinner size="sm" color="danger" />
          ) : (
            <MdDelete className="text-2xl" />
          )}
        </Button>
      </td>
    </tr>
  );
};

export default UserTableRow;
