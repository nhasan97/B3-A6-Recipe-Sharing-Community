import { dislikeUndislikeRecipe } from "@/src/services/LikeDislikeRecipe";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDisikeUndislikeRecipe = () => {
  return useMutation<
    any,
    Error,
    {
      recipeId: string;
      loggedInUserId: string;
      dislikeStatus: string;
    }
  >({
    mutationKey: ["DISLIKE_RECIPE"],
    mutationFn: async ({
      recipeId,
      loggedInUserId,
      dislikeStatus,
    }: {
      recipeId: string;
      loggedInUserId: string;
      dislikeStatus: string;
    }) =>
      await dislikeUndislikeRecipe({
        recipeId,
        loggedInUserId,
        dislikeStatus,
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
