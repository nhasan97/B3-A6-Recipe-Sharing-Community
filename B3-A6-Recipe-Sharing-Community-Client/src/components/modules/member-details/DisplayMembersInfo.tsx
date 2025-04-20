import { IUser } from "@/src/types/user.type";
import { Image } from "@nextui-org/image";
import React, { useEffect, useState } from "react";
import AuthenticationModal from "../../modals/AuthenticationModal";
import { Button } from "@nextui-org/button";
import { useFollowUnfollowMember } from "@/src/hooks/user.hook";
import { Spinner } from "@nextui-org/spinner";
import { Tooltip } from "@nextui-org/tooltip";

const DisplayMembersInfo = ({
  member,
  loggedInUser,
}: {
  member: { data: IUser };
  loggedInUser: IUser;
}) => {
  const [followStatus, setFollowStatus] = useState("");

  const {
    mutate: handleFollowUnfollowMember,
    isPending: pendingFollowUnFollow,
  } = useFollowUnfollowMember();

  // Initializing followStatus based on whether the user is following the member
  useEffect(() => {
    if (member?.data?.followers?.includes(loggedInUser?._id)) {
      setFollowStatus("unfollow");
    } else {
      setFollowStatus("follow");
    }
  }, [member, loggedInUser]);

  const handleFollowUnfollow = () => {
    const newFollowStatus = followStatus === "follow" ? "unfollow" : "follow";

    const data = {
      memberId: member?.data?._id,
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
    <div className="w-full">
      <div className="w-full h-48 xl:h-40 flex justify-center items-center bg-[url('/assets/images/member-cover.jpg')] bg-cover bg-center bg-[#000000af] bg-blend-overlay rounded-lg">
        <div>
          <Image
            alt="NextUI hero Image"
            src={member?.data?.profilePhoto}
            className="size-[200px] translate-y-[96px] xl:translate-y-[80px] border-4 border-white rounded-full shadow-lg"
          />
          {member?.data?.userType === "PRO" && (
            <Tooltip content={"Premium Member"}>
              <Image
                src={"/assets/icons/premium-2.png"}
                alt="Users Profile Photo"
                className="size-[50px] mx-auto object-fill object-center bg-red-700 p-1 rounded-full translate-y-[50%]"
                isBlurred
              />
            </Tooltip>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-5 mt-28">
        <div className="text-center">
          <h1 className="text-3xl">{member?.data?.name}</h1>
          <div className="text-[#757575] flex items-center gap-2">
            <i className="fa-solid fa-envelope" />
            <p>{member?.data?.email}</p>
          </div>
        </div>

        <p className="">{member?.data?.bio}</p>

        <div className="w-full flex justify-center items-center gap-3">
          <div className="bg-[#6C6555] py-2 px-4 text-white text-center space-y-2 rounded-lg shadow-lg">
            <p className="text-4xl">{member?.data?.followers?.length}</p>
            <p>Followers</p>
          </div>

          <div className="bg-[#6C6555] py-2 px-4 text-white text-center space-y-2 rounded-lg shadow-lg">
            <p className="text-4xl">{member?.data?.following?.length}</p>
            <p>Following</p>
          </div>
        </div>

        <div className="w-1/2 flex justify-center items-center ">
          {!loggedInUser?.email ? (
            <AuthenticationModal
              buttonText={`Follow ${member?.data?.name}`}
              buttonClassName="bg-red-700 text-white text-lg"
              redirect={`/member-details/${member?.data?._id}`}
            />
          ) : (
            <Button
              className="flex-1 bg-red-700 text-white text-lg"
              disabled={loggedInUser?.email === member?.data?.email}
              onClick={handleFollowUnfollow}
            >
              {pendingFollowUnFollow ? (
                <Spinner color="white" />
              ) : followStatus === "follow" ? (
                `Follow ${member?.data?.name}`
              ) : (
                `Unfollow ${member?.data?.name}`
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayMembersInfo;
