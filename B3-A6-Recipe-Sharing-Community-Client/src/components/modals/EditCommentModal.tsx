import React from "react";
import FXModal from "../UI/FXModal";
import FXForm from "../UI/form/FXForm";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IComment } from "@/src/types/comment.type";
import FXTextarea from "../UI/form/FXTextarea";
import { useUpdateComment } from "@/src/hooks/comment.hook";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

const EditCommentModal = ({
  comment,
  refetchComments,
}: {
  comment: IComment;
  refetchComments: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const { mutate: handleUpdateComment, isPending } = useUpdateComment();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUpdateComment(
      {
        commentId: comment?._id as string,
        updatedCommentData: data,
      },
      {
        onSuccess: () => {
          refetchComments();
        },
      }
    );
  };

  return (
    <FXModal
      title="Edit Comment"
      buttonText={
        <i className="fa-solid fa-pen-to-square group-hover:text-green-700 group-hover:transition-all" />
      }
      buttonClassName="bg-[#ececec] group"
      buttonSize="sm"
      radius="full"
      isIconOnly
    >
      <FXForm onSubmit={onSubmit} defaultValues={comment}>
        <FXTextarea name="comment" label="Your Comment" />
        <Button
          type="submit"
          className="my-3 w-full bg-red-700 font-semibold text-white"
          size="lg"
          radius="lg"
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </FXForm>
    </FXModal>
  );
};

export default EditCommentModal;
