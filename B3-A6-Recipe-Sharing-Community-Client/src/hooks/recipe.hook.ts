import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { shareRecipe } from "../services/ShareRecipe";
import { toast } from "sonner";
import { changeRecipeStatus } from "../services/UpdateRecipeStatus";
import { updateRecipe } from "../services/UpdateRecipe";
import { deleteRecipe } from "../services/DeleteRecipe";
import {
  getRecipeCount,
  getRecipes,
  getSingleRecipe,
  getUsersRecipeCount,
} from "../services/GetRecipes";
import { getUsersRecipes } from "../services/GetUsersRecipes";
import {
  dislikeUndislikeRecipe,
  likeUnlikeRecipe,
} from "../services/LikeDislikeRecipe";

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

export const useGetSingleRecipe = (recipeID: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_RECIPE", recipeID],
    queryFn: async () => await getSingleRecipe(recipeID),
    enabled: !!recipeID,
  });
};

export const useShareRecipe = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["SHARE_RECIPE"],
    mutationFn: async (recipeData) => await shareRecipe(recipeData),
    onSuccess: () => {
      toast.success("Recipe created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

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

export const useUpdateRecipe = () => {
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
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

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
        queryKey: ["GET_USERS_RECIPES"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLikeUnlikeRecipe = () => {
  return useMutation<
    any,
    Error,
    {
      recipeId: string;
      loggedInUserId: string;
      likeStatus: string;
    }
  >({
    mutationKey: ["LIKE_RECIPE"],
    mutationFn: async ({
      recipeId,
      loggedInUserId,
      likeStatus,
    }: {
      recipeId: string;
      loggedInUserId: string;
      likeStatus: string;
    }) =>
      await likeUnlikeRecipe({
        recipeId,
        loggedInUserId,
        likeStatus,
      }),
    onSuccess: () => {
      toast.success("Done", {
        duration: 2000,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDisikeUndislikeRecipe = () => {
  return useMutation<
    any,
    Error,
    {
      recipeId: string;
      loggedInUserId: string;
      dislikeStatus: string;
    }
  >({
    mutationKey: ["DISLIKE_RECIPE"],
    mutationFn: async ({
      recipeId,
      loggedInUserId,
      dislikeStatus,
    }: {
      recipeId: string;
      loggedInUserId: string;
      dislikeStatus: string;
    }) =>
      await dislikeUndislikeRecipe({
        recipeId,
        loggedInUserId,
        dislikeStatus,
      }),
    onSuccess: () => {
      toast.success("Done", {
        duration: 2000,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetRecipeCount = (loggedInUserEmail: string | undefined) => {
  return useQuery({
    queryKey: ["GET_RECIPE_COUNT", loggedInUserEmail],
    queryFn: async () => await getRecipeCount(loggedInUserEmail),
  });
};

export const useGetUsersRecipeCount = (loggedInUserId: string) => {
  return useQuery({
    queryKey: ["GET_USERS_RECIPE_COUNT", loggedInUserId],
    queryFn: async () => await getUsersRecipeCount(loggedInUserId),
    enabled: !!loggedInUserId,
  });
};
