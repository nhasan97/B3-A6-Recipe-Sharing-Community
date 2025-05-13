import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../services/GetRecipes";

export const useGetRecipes = (
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
      "GET_RECIPES",
      loggedInUserEmail,
      searchTerm,
      category,
      contentType,
      sort,
      page,
      limit,
    ],
    queryFn: async () =>
      await getRecipes(
        loggedInUserEmail,
        searchTerm,
        category,
        contentType,
        sort,
        page,
        limit
      ),
    enabled: true,
  });
};
