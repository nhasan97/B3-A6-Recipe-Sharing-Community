"use client";

import { IRecipe } from "@/src/types/recipe.type";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useUser } from "@/src/context/user.provider";
import { toast } from "sonner";
import { useChangeRecipeStatus } from "@/src/hooks/recipe.hook";

const MembersRecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  const { _id, title, images, rating, upVote, downVote, status } = recipe || {};

  const { user: loggedInUser } = useUser();

  const { mutate: handleChangeRecipeStatus } = useChangeRecipeStatus();

  const handlePublishUnpublishRecipe = (status: string) => {
    toast.warning("Are you sure to change recipe status?", {
      action: {
        label: "Yes",
        onClick: () => {
          try {
            const res = handleChangeRecipeStatus({
              recipeId: _id as string,
              status,
            });
          } catch (err: any) {
            toast.error(err.data.message, { duration: 2000 });
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.info("Cancelled!", { duration: 2000 }),
      },
    });
  };

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-start">
        <div className="space-y-3">
          <h4 className="font-bold text-large">{title}</h4>

          <Rating style={{ maxWidth: 100 }} value={rating} readOnly />

          <small className="text-default-500 flex items-center gap-3">
            <p>
              <i className="fa-solid fa-arrow-up" />
              <span>{upVote?.length}</span>
            </p>
            <p>
              <i className="fa-solid fa-arrow-down" />
              <span>{downVote?.length}</span>
            </p>
          </small>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="w-full h-[180px] object-cover object-center rounded-xl"
          src={images[0]}
        />
      </CardBody>
      <CardFooter className="justify-between gap-3 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] ml-1 shadow-small z-10">
        <Link href={`/recipe-details/${_id}`}>
          <Button
            className="flex-1 text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            Details
          </Button>
        </Link>
        {loggedInUser?.role === "ADMIN" && status === "PUBLISHED" && (
          <Button
            className="flex-1 text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
            onClick={() => handlePublishUnpublishRecipe("UNPUBLISHED")}
          >
            Unpublish
          </Button>
        )}
        {loggedInUser?.role === "ADMIN" && status === "UNPUBLISHED" && (
          <Button
            className="flex-1 text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
            onClick={() => handlePublishUnpublishRecipe("PUBLISHED")}
          >
            Publish
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MembersRecipeCard;
