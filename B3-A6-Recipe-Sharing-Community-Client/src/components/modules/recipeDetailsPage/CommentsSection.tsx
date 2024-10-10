"use client";

import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FXInput from "../../form/FXInput";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import AuthenticationModal from "../../modals/AuthenticationModal";
import { IComment } from "@/src/types/comment.type";
import CommentCard from "../../UI/CommentCard";
import { usePostComment } from "@/src/hooks/comment.hook";

const CommentsSection = ({
  recipeId,
  commentData,
}: {
  recipeId: string;
  commentData: { data: IComment[] };
}) => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const { user } = useUser();
  const { mutate: handleCreateComment } = usePostComment();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const commentPost = {
      user: user?._id,
      recipe: recipeId,
      comment: data.comment,
    };

    handleCreateComment(commentPost);
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="h-[10%]">
        <h3 className="text-3xl">Comments ({commentData?.data?.length})</h3>
      </div>

      <div className="h-[80%] overflow-y-auto">
        {commentData?.data?.map((comment: IComment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </div>

      <div className="h-[10%]">
        {user?.email && (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center relative">
                <FXInput name="comment" label="Your comment" />

                <Button type="submit" className="absolute right-2">
                  Post
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
        {!user?.email && (
          <AuthenticationModal
            buttonText="Comment"
            redirect={`recipe-details/${recipeId}`}
          />
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
