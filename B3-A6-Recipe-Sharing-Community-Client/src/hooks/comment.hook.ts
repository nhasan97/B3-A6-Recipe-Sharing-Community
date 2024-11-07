import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { postComment } from "../services/PostComment";
import { toast } from "sonner";
import { getComments } from "../services/GetComments";
import { deleteComment } from "../services/DeleteComment";
import { updateComment } from "../services/UpdateComment";

export const usePostComment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POST_COMMENT"],
    mutationFn: async (comment) => await postComment(comment),
    onSuccess: () => {
      toast.success("Comment posted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetComments = (recipeID: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_RECIPE_COMMENTS", recipeID],
    queryFn: async () => await getComments(recipeID),
    enabled: !!recipeID,
  });
};

export const useUpdateComment = () => {
  return useMutation<
    any,
    Error,
    { commentId: string; updatedCommentData: FieldValues }
  >({
    mutationKey: ["UPDATE_COMMENT"],
    mutationFn: async ({
      commentId,
      updatedCommentData,
    }: {
      commentId: string;
      updatedCommentData: FieldValues;
    }) =>
      await updateComment({
        commentId,
        updatedCommentData,
      }),
    onSuccess: () => {
      toast.success("Comment updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteComment = () => {
  return useMutation<any, Error, { commentId: string }>({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async ({ commentId }: { commentId: string }) =>
      await deleteComment({
        commentId,
      }),
    onSuccess: () => {
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
