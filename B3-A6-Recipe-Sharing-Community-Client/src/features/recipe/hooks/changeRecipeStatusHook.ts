import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeRecipeStatus } from "../services/UpdateRecipeStatus";
import { toast } from "sonner";

export const useChangeRecipeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { recipeId: string; status: string }>({
    mutationKey: ["CHANGE_RECIPE_STATUS"],
    mutationFn: async ({
      recipeId,
      status,
    }: {
      recipeId: string;
      status: string;
    }) =>
      await changeRecipeStatus({
        recipeId,
        status,
      }),
    onSuccess: () => {
      toast.success("Recipe status changed successfully", {
        duration: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: ["GET_RECIPES"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
