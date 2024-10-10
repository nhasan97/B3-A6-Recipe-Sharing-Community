import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { postComment } from "../services/PostComment";
import { toast } from "sonner";

export const usePostComment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POST_COMMENT"],
    mutationFn: async (comment) => await postComment(comment),
    onSuccess: () => {
      toast.success("comment posted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
