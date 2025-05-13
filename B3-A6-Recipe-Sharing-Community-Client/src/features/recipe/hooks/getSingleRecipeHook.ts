import { useQuery } from "@tanstack/react-query";
import { getSingleRecipe } from "../services/GetRecipes";

export const useGetSingleRecipe = (recipeID: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_RECIPE", recipeID],
    queryFn: async () => await getSingleRecipe(recipeID),
    enabled: !!recipeID,
  });
};
