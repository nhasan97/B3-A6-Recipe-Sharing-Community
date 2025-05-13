import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe } from "../services/DeleteRecipe";
import { toast } from "sonner";

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { recipeId: string }>({
    mutationKey: ["DELETE_RECIPE"],
    mutationFn: async ({ recipeId }: { recipeId: string }) =>
      await deleteRecipe({
        recipeId,
      }),
    onSuccess: () => {
      toast.success("Recipe deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["GET_RECIPES", "GET_USERS_RECIPES"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
