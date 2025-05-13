import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shareRecipe } from "../services/ShareRecipe";
import { toast } from "sonner";

export const useShareRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FormData>({
    mutationKey: ["SHARE_RECIPE"],
    mutationFn: async (recipeData) => await shareRecipe(recipeData),
    onSuccess: () => {
      toast.success("Recipe created successfully");
      queryClient.invalidateQueries({
        queryKey: ["GET_RECIPES", "GET_USERS_RECIPES"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
