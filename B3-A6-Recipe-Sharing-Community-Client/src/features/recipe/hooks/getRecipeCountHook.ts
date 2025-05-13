import { useQuery } from "@tanstack/react-query";
import { getRecipeCount } from "../services/GetRecipes";

export const useGetRecipeCount = (loggedInUserEmail: string | undefined) => {
  return useQuery({
    queryKey: ["GET_RECIPE_COUNT", loggedInUserEmail],
    queryFn: async () => await getRecipeCount(loggedInUserEmail),
  });
};
