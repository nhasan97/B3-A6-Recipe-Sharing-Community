import { useQuery } from "@tanstack/react-query";
import { getUsersRecipeCount } from "../services/GetRecipes";

export const useGetUsersRecipeCount = (userId: string) => {
  return useQuery({
    queryKey: ["GET_USERS_RECIPE_COUNT", userId],
    queryFn: async () => await getUsersRecipeCount(userId),
    enabled: !!userId,
  });
};
