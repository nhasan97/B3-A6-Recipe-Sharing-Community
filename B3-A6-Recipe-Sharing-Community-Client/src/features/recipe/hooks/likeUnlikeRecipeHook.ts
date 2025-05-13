import { likeUnlikeRecipe } from "@/src/services/LikeDislikeRecipe";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLikeUnlikeRecipe = () => {
  return useMutation<
    any,
    Error,
    {
      recipeId: string;
      loggedInUserId: string;
      likeStatus: string;
    }
  >({
    mutationKey: ["LIKE_RECIPE"],
    mutationFn: async ({
      recipeId,
      loggedInUserId,
      likeStatus,
    }: {
      recipeId: string;
      loggedInUserId: string;
      likeStatus: string;
    }) =>
      await likeUnlikeRecipe({
        recipeId,
        loggedInUserId,
        likeStatus,
      }),
    onSuccess: () => {
      toast.success("Done", {
        duration: 2000,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
