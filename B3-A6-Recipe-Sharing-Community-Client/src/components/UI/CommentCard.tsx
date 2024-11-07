import { useUser } from "@/src/context/user.provider";
import { IComment } from "@/src/types/comment.type";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import React from "react";
import EditCommentModal from "../modals/EditCommentModal";
import { useDeleteComment } from "@/src/hooks/comment.hook";
import { toast } from "sonner";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/spinner";

const CommentCard = ({
  comment,
  refetchComments,
}: {
  comment: IComment;
  refetchComments: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const { user } = useUser();
  /*
    
  -----delete comment------------------------------------------------------------------------------*/
  const { mutate: deleteRecipeComment, isPending: pendingDeleteComment } =
    useDeleteComment();

  const handleDeleteComment = (_id: string) => {
    toast.warning(
      "Are you sure to delete comment? You won't be able to revert this!!",
      {
        action: {
          label: "Yes, delete comment.",
          onClick: () => {
            try {
              deleteRecipeComment(
                {
                  commentId: _id as string,
                },
                {
                  onSuccess: () => {
                    refetchComments();
                  },
                }
              );
            } catch (err: any) {
              toast.error(err.data.message, { duration: 2000 });
            }
          },
        },
        cancel: {
          label: "Cancel",
          onClick: () => toast.info("Cancelled!", { duration: 2000 }),
        },
      }
    );
  };

  return (
    <Card className="shadow-none border-b rounded-none">
      <CardHeader className="flex justify-between gap-3">
        <div className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src={comment?.user?.profilePhoto}
            width={40}
          />
          <div className="flex flex-col justify-center">
            <h4 className="text-gray-700 font-bold text-large">
              {comment?.user?.name}
            </h4>
          </div>
        </div>

        {comment?.user?.email === user?.email ? (
          <div className="flex justify-center items-center gap-2">
            {/* //// Edit button//// */}

            <EditCommentModal
              comment={comment}
              refetchComments={refetchComments}
            />

            {/* <Button
              isIconOnly
              className="bg-[#ececec] group"
              size="sm"
              radius="full"
            >
              <i className="fa-solid fa-pen-to-square group-hover:text-green-700 group-hover:transition-all" />
            </Button> */}

            {/* //// Delete button //// */}
            <Button
              isIconOnly
              className="bg-[#ececec] group"
              size="sm"
              radius="full"
              onClick={() => handleDeleteComment(comment?._id as string)}
            >
              {pendingDeleteComment ? (
                <Spinner />
              ) : (
                <i className="fa-solid fa-trash group-hover:text-red-700 group-hover:transition-all" />
              )}
            </Button>
          </div>
        ) : (
          ""
        )}
      </CardHeader>

      <CardBody>
        <p>{comment?.comment}</p>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
