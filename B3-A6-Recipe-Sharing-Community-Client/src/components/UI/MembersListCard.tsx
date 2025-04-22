"use client";

import { useFollowUnfollowMember } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types/user.type";
import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import React, { useEffect, useState } from "react";
import AuthenticationModal from "../modals/AuthenticationModal";
import { Spinner } from "@nextui-org/spinner";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/tooltip";

const MembersListCard = ({
  member,
  loggedInUser,
}: {
  member: IUser;
  loggedInUser: IUser;
}) => {
  const { _id, name, email, profilePhoto, followers, userType } = member;

  // ------function for navigating to profile page----------------------------------------------------------------------------------
  const router = useRouter();
  const handleNavigation = (pathName: string) => {
    router.push(pathName);
  };

  // ------handling follow unfollow user----------------------------------------------------------------------------------
  const [followStatus, setFollowStatus] = useState("");

  const {
    mutate: handleFollowUnfollowMember,
    isPending: pendingFollowUnFollow,
  } = useFollowUnfollowMember();

  // Initializing followStatus based on whether the user is following the member
  useEffect(() => {
    if (followers?.includes(loggedInUser?._id)) {
      setFollowStatus("unfollow");
    } else {
      setFollowStatus("follow");
    }
  }, [member, loggedInUser]);

  const handleFollowUnfollow = () => {
    const newFollowStatus = followStatus === "follow" ? "unfollow" : "follow";

    const data = {
      memberId: _id,
      loggedInUserId: loggedInUser?._id,
      followStatus: followStatus,
    };

    handleFollowUnfollowMember(data, {
      onSuccess: () => {
        setFollowStatus(newFollowStatus);
      },
    });
  };

  return (
    <Card className="bg-transparent border shadow-none rounded-full">
      <CardHeader className="flex justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-fit h-fit relative">
            <Image
              removeWrapper
              alt="nextui logo"
              height={45}
              radius="full"
              src={profilePhoto}
              width={45}
            />

            {userType === "PRO" && (
              <Tooltip content={"Premium Member"}>
                <div className="absolute right-0 bottom-0 ">
                  <Image
                    src={"/assets/icons/premium-2.png"}
                    alt="Users Profile Photo"
                    className="size-[15px] mx-auto object-fill object-center bg-red-700 rounded-full"
                    isBlurred
                  />
                </div>
              </Tooltip>
            )}
          </div>

          <p className="text-md pl-3 border-l">{name}</p>
        </div>

        <div className="flex items-center gap-1">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly radius="full" size="sm">
                <i className="fa-solid fa-ellipsis-vertical" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" closeOnSelect={false}>
              {/* //// View User Profile Button//// */}
              <DropdownItem
                key="view-profile"
                onClick={() => handleNavigation(`/member-details/${_id}`)}
              >
                <div className="flex justify-center items-center gap-2">
                  <i className="fa-solid fa-eye" />
                  <p> View Profile</p>
                </div>
              </DropdownItem>

              {/* //// Follow unfollow User Button//// */}
              {!loggedInUser?.email ? (
                <DropdownItem key="follow-unfollow1">
                  <AuthenticationModal
                    buttonText={
                      <div className="flex gap-2">
                        <i className="fa-solid fa-user-plus" />
                        <p>Follow {name}</p>
                      </div>
                    }
                    buttonClassName="w-full bg-transparent"
                    buttonVariant="flat"
                    buttonSize="sm"
                    redirect={`/member-details/${_id}`}
                  />
                </DropdownItem>
              ) : loggedInUser?.email !== email ? (
                <DropdownItem
                  key="follow-unfollow3"
                  className="text-center"
                  onClick={handleFollowUnfollow}
                >
                  {pendingFollowUnFollow ? (
                    <Spinner color="danger" size="sm" className="mx-auto" />
                  ) : followStatus === "follow" ? (
                    <div className="flex justify-center items-center gap-2">
                      <i className="fa-solid fa-user-plus" />
                      <p>Follow {name}</p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <i className="fa-solid fa-user-minus" />
                      <p>Unfollow {name}</p>
                    </div>
                  )}
                </DropdownItem>
              ) : (
                // : loggedInUser?.role === "ADMIN" ? (
                //   <DropdownItem key="follow-unfollow2">
                //     <FeatureForUserModal
                //       buttonText={`Follow ${name}`}
                //       buttonClassName="w-full bg-transparent"
                //       buttonVariant="flat"
                //       buttonSize="sm"
                //       redirect={`/member-details/${_id}`}
                //     />
                //   </DropdownItem>
                // )

                <></>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>
    </Card>
  );
};

export default MembersListCard;
