"use client";

import { useChangeUserStatus, useDeleleUser } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types/user.type";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Spinner } from "@nextui-org/spinner";
import { CgBlock, CgUnblock } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { GrStatusGoodSmall } from "react-icons/gr";
import { ImBlocked } from "react-icons/im";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

const MobileViewUserCard = ({
  user,
  refetchUsers,
}: {
  user: IUser;
  refetchUsers: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  // -------handling block/unblock user-------------------------------------------------------------------------
  const { mutate: handleChangeUserStatus, isPending: pendingChangeUserStatus } =
    useChangeUserStatus();

  const handleBlockUnblockUser = (status: string) => {
    toast.warning("Are you sure to change user status?", {
      action: {
        label: "Yes",
        onClick: () => {
          try {
            handleChangeUserStatus(
              {
                userId: user?._id,
                status,
              },
              { onSuccess: () => refetchUsers() }
            );
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
              deleteUser(
                {
                  userId: user?._id,
                },
                { onSuccess: () => refetchUsers() }
              );
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
    <div className="h-fit bg-black/10 backdrop-blur-md rounded-md shadow-md">
      <div className="flex justify-between items-center px-2 py-5 gap-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-small text-default-500 relative">
              <Image
                src={user?.profilePhoto}
                alt="nextui logo"
                width={60}
                height={60}
                radius="sm"
                className="object-cover object-center"
                isBlurred
              />
              {user?.status === "ACTIVE" && (
                <GrStatusGoodSmall className="text-lg text-green-500 border-2 border-white rounded-full absolute right-0 translate-x-1 -translate-y-3 z-10" />
              )}
              {user?.status === "BLOCKED" && (
                <ImBlocked className="text-lg text-red-700 border-2 border-white rounded-full absolute right-0 translate-x-1 -translate-y-3 z-10" />
              )}
            </div>

            <div className="flex flex-col">
              <p className="text-lg text-[#121213]">{user?.name}</p>
              {/* <p className="text-xs text-default-500">{user?.email}</p> */}
              <div className="flex items-center gap-1 text-xs text-default-500">
                <p>{user?.email}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-default-500">
                <p>+{user?.mobileNumber}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                radius="full"
                size="sm"
                className="bg-transparent text-red-700"
              >
                <i className="fa-solid fa-ellipsis-vertical" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" closeOnSelect={false}>
              {/* //// block unblock button //// */}

              {user?.status === "ACTIVE" ? (
                <DropdownItem
                  key="block-user"
                  onClick={() => handleBlockUnblockUser("BLOCKED")}
                >
                  {pendingChangeUserStatus ? (
                    <Spinner size="sm" color="danger" className="mx-auto" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <CgBlock className="text-2xl text-red-700" />
                      <p>Block User</p>
                    </div>
                  )}
                </DropdownItem>
              ) : (
                <DropdownItem
                  key="unblock-user"
                  onClick={() => handleBlockUnblockUser("ACTIVE")}
                >
                  {pendingChangeUserStatus ? (
                    <Spinner size="sm" color="success" className="mx-auto" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <CgUnblock className="text-2xl text-green-700" />
                      <p>Unblock User</p>
                    </div>
                  )}
                </DropdownItem>
              )}

              {/* //// delete user button //// */}
              <DropdownItem
                key="delete-user"
                onClick={() => handleDeleteUser()}
              >
                {pendingDeleteUser ? (
                  <Spinner size="sm" color="danger" className="mx-auto" />
                ) : (
                  <div className="flex items-center gap-2">
                    <MdDelete className="text-2xl text-red-700" />
                    <p>Delete User</p>
                  </div>
                )}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default MobileViewUserCard;
