import { followUnfollowMember } from "@/src/features/follow/services/followUnfollowMember";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFollowUnfollowMember = () => {
  const queryClient = useQueryClient();

  return useMutation<
    any,
    Error,
    {
      memberId: string;
      loggedInUserId: string;
      followStatus: string;
    }
  >({
    mutationKey: ["FOLLOW_UNFOLLOW_MEMBER"],
    mutationFn: async ({
      memberId,
      loggedInUserId,
      followStatus,
    }: {
      memberId: string;
      loggedInUserId: string;
      followStatus: string;
    }) =>
      await followUnfollowMember({
        memberId,
        loggedInUserId,
        followStatus,
      }),
    onSuccess: (_, { memberId }) => {
      toast.success("Done", {
        duration: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: ["GET_SINGLE_USER", memberId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
