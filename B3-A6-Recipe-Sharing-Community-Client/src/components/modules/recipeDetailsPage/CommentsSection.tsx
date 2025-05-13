"use client";

import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FXInput from "../../UI/form/FXInput";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import AuthenticationModal from "../../modals/AuthenticationModal";
import { IComment } from "@/src/types/comment.type";
import CommentCard from "../../UI/CommentCard";
import { usePostComment } from "@/src/hooks/comment.hook";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

const CommentsSection = ({
  recipeId,
  commentData,
  refetchComments,
}: {
  recipeId: string;
  commentData: { data: IComment[] };
  refetchComments: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  /*

  -----post comment------------------------------------------------------------------------------*/
  const methods = useForm();
  const { handleSubmit } = methods;
  const { user } = useUser();
  const { mutate: handleCreateComment, isPending } = usePostComment();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const commentPost = {
      user: user?._id,
      recipe: recipeId,
      comment: data.comment,
    };

    handleCreateComment(commentPost, {
      onSuccess: () => {
        refetchComments();
      },
    });
  };

  return (
    <div className="flex flex-col justify-between gap-6">
      <div className="h-[10%]">
        <h3 className="text-3xl">Comments ({commentData?.data?.length})</h3>
      </div>

      <div className="h-[400px] overflow-y-auto">
        {commentData?.data?.map((comment: IComment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            refetchComments={refetchComments}
          />
        ))}
      </div>

      <div className="h-[10%]">
        {!user?.email ? (
          <AuthenticationModal
            buttonText="Add Comment"
            buttonClassName="bg-red-700 text-white"
            redirect={`recipe-details/${recipeId}`}
          />
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center relative">
                <FXInput name="comment" label="Your comment" />

                <Button type="submit" className="group absolute right-2">
                  {isPending ? (
                    "Posting..."
                  ) : (
                    <i className="fa-solid fa-paper-plane group-hover:text-red-700" />
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
