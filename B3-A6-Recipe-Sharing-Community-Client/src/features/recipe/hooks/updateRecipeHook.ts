import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipe } from "../services/UpdateRecipe";
import { toast } from "sonner";

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<
    any,
    Error,
    { recipeId: string; updatedRecipeData: FormData }
  >({
    mutationKey: ["UPDATE_RECIPE"],
    mutationFn: async ({
      recipeId,
      updatedRecipeData,
    }: {
      recipeId: string;
      updatedRecipeData: FormData;
    }) =>
      await updateRecipe({
        recipeId,
        updatedRecipeData,
      }),
    onSuccess: () => {
      toast.success("Recipe updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["GET_RECIPES", "GET_USERS_RECIPES"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
