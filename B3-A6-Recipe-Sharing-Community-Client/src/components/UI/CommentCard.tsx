import { useUser } from "@/src/context/user.provider";
import { IComment } from "@/src/types/comment.type";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import React from "react";

const CommentCard = ({ comment }: { comment: IComment }) => {
  const { user } = useUser();

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
          <div className="flex flex-col">
            <p className="text-md">{comment?.user?.name}</p>
            {/* <p className="text-small text-default-500">
              {comment?.user?.email}
            </p> */}
          </div>
        </div>
        {comment?.user?.email === user?.email ? <Button>Edit</Button> : ""}
      </CardHeader>

      <CardBody>
        <p>{comment?.comment}</p>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
