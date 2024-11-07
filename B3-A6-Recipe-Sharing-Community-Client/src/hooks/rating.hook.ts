import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { postRating } from "../services/PostRating";
import { toast } from "sonner";
import { getRecipeRating } from "../services/GetRecipeRating";

export const usePostRating = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POST_RATING"],
    mutationFn: async (rating) => await postRating(rating),
    onSuccess: () => {
      toast.success("Rating posted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetUsersRating = (recipeId: string, userId?: string) => {
  return useQuery({
    queryKey: ["GET_USERS_RATING", recipeId, userId],
    queryFn: async () => await getRecipeRating(recipeId, userId),
    enabled: !!recipeId,
  });
};

// export const useGetRecipeRating = (recipeId: string) => {
//   return useQuery({
//     queryKey: ["GET_RECIPE_RATING"],
//     queryFn: async () => await getRecipeRating(recipeId),
//     enabled: !!recipeId,
//   });
// };
