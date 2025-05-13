import { useQuery } from "@tanstack/react-query";
import { getUsersRecipes } from "../services/GetUsersRecipes";

export const useGetUsersRecipes = (
  userID: string,
  loggedInUserEmail: string | undefined,
  searchTerm: string,
  category: string,
  contentType: string,
  sort: string,
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: [
      "GET_USERS_RECIPES",
      userID,
      loggedInUserEmail,
      searchTerm,
      category,
      contentType,
      sort,
      page,
      limit,
    ],
    queryFn: async () =>
      await getUsersRecipes(
        userID,
        loggedInUserEmail,
        searchTerm,
        category,
        contentType,
        sort,
        page,
        limit
      ),
    enabled: !!userID,
  });
};
