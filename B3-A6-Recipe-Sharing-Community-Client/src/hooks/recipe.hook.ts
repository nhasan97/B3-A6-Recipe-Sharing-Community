import { useMutation } from "@tanstack/react-query";
import { shareRecipe } from "../services/ShareRecipe";
import { toast } from "sonner";
import { changeRecipeStatus } from "../services/UpdateRecipeStatus";

export const useShareRecipe = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["SHARE_RECIPE"],
    mutationFn: async (recipeData) => await shareRecipe(recipeData),
    onSuccess: () => {
      toast.success("recipe created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useChangeRecipeStatus = () => {
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
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
