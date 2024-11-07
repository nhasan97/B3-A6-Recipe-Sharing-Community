"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const followUnfollowMember = async ({
  memberId,
  loggedInUserId,
  followStatus,
}: {
  memberId: string;
  loggedInUserId: string;
  followStatus: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/users/follow-unfollow/user?memberId=${memberId}&loggedInUserId=${loggedInUserId}&followStatus=${followStatus}`
    );

    return data;
  } catch (error: any) {
    throw new Error(`Failed to change ${error.message}`);
  }
};
