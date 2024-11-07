"use client";

import { useUser } from "@/src/context/user.provider";
import { Avatar } from "@nextui-org/avatar";
import React, { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";
import { Button } from "@nextui-org/button";
import { IRecipe } from "@/src/types/recipe.type";
import { IUser } from "@/src/types/user.type";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link } from "@nextui-org/link";
import {
  useDisikeUndislikeRecipe,
  useLikeUnlikeRecipe,
} from "@/src/hooks/recipe.hook";
import { Spinner } from "@nextui-org/spinner";
import AuthenticationModal from "../modals/AuthenticationModal";
import { useGetUsersRating } from "@/src/hooks/rating.hook";
import GetMembershipModal from "../modals/GetMembershipModal";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { dateToISO } from "@/src/utils/dateToISO";
import { IDate } from "@/src/types/date.type";
import { CiCalendarDate } from "react-icons/ci";

const RecipeFeedCard = ({
  recipe,
  refetchAllRecipes,
}: {
  recipe: IRecipe;
  refetchAllRecipes: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const {
    _id,
    title,
    rating,
    images,
    user,
    contentType,
    createdAt,
    upVote,
    downVote,
  } = recipe || {};

  const { name, profilePhoto } = (user as IUser) || {};
  const { user: loggedInUser } = useUser();

  const dateCreated: { formattedDate: string; formattedTime: string } =
    dateToISO(createdAt as IDate);

  const { isLoading: loadingUserRatingData, data: userRatingData } =
    useGetUsersRating(_id as string);

  /*
  

  -----handling Up vote------------------------------------------------------------------------------------------------------- */
  const [likeStatus, setLikeStatus] = useState("");

  const { mutate: handleLikeUnlikeRecipe, isPending: pendingLikeUnlike } =
    useLikeUnlikeRecipe();

  useEffect(() => {
    if (upVote?.includes(loggedInUser?._id as string)) {
      setLikeStatus("unlike");
    } else {
      setLikeStatus("like");
    }
  }, [upVote, loggedInUser]);

  const handleUpvote = () => {
    const newLikeStatus = likeStatus === "like" ? "unlike" : "like";

    const data = {
      recipeId: _id as string,
      loggedInUserId: loggedInUser?._id as string,
      likeStatus: likeStatus,
    };

    handleLikeUnlikeRecipe(data, {
      onSuccess: () => {
        setLikeStatus(newLikeStatus);
        refetchAllRecipes();
      },
    });
  };

  /*

  
  -----handling down vote------------------------------------------------------------------------------------------------------- */
  const [dislikeStatus, setDislikeStatus] = useState("");

  const {
    mutate: handleDislikeUndislikeRecipe,
    isPending: pendingDisikeUndislike,
  } = useDisikeUndislikeRecipe();

  useEffect(() => {
    if (downVote?.includes(loggedInUser?._id as string)) {
      setDislikeStatus("undislike");
    } else {
      setDislikeStatus("dislike");
    }
  }, [downVote, loggedInUser]);

  const handleDownVote = () => {
    const newDislikeStatus =
      dislikeStatus === "dislike" ? "undislike" : "dislike";

    const data = {
      recipeId: _id as string,
      loggedInUserId: loggedInUser?._id as string,
      dislikeStatus: dislikeStatus,
    };

    handleDislikeUndislikeRecipe(data, {
      onSuccess: () => {
        setDislikeStatus(newDislikeStatus);
        refetchAllRecipes();
      },
    });
  };

  return (
    <div className="mb-2 rounded-md bg-default-100 p-4">
      <div className="border-b border-default-200 pb-2">
        {/* -----division 1: Recipe Sharer's image and name------------------------------------------------------------------------------------------------------- */}

        <div className="flex items-center justify-between border-b border-default-200 pb-4">
          <div className="w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar isBordered name={name} radius="sm" src={profilePhoto} />
              <p>{name}</p>
            </div>

            <div>
              <p className="text-xs">
                {/* <CiCalendarDate className="text-base" />  */}
                Posted on {dateCreated.formattedDate}
              </p>
              {/* <p className="text-sm">{dateCreated.formattedTime}</p> */}
            </div>
          </div>
        </div>

        {/* -----division 2: Recipe tile badge and rating------------------------------------------------------------------------------------------------------- */}

        <div className="border-b border-default-200 py-4">
          <div className="mb-4 flex items-start justify-between">
            <div>
              {contentType === "Exclusive" ? (
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl text-black">{title}</h1>
                  <div className="bg-red-500 p-1 text-sm text-white rounded-full ">
                    {contentType}
                  </div>
                </div>
              ) : (
                <Link href={`/recipe-details/${_id}`}>
                  <h1 className="cursor-pointer text-2xl text-black">
                    {title}
                  </h1>{" "}
                </Link>
              )}

              <div className="flex items-center gap-2">
                <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
                <p>({userRatingData?.data?.numberOfRecipeRatings})</p>
              </div>
            </div>
          </div>
        </div>

        {/* -----division 3: Recipe images------------------------------------------------------------------------------------------------------- */}

        <ImageGallery images={images} />

        {/* -----division 4: Up vote , down vote and details buttons------------------------------------------------------------------------------------------------------- */}

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            {/* ////up Vote button//// */}
            {!loggedInUser?.email ? (
              <AuthenticationModal
                buttonText={
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-arrow-up" />
                    {upVote?.length}
                  </div>
                }
                redirect={`/`}
              />
            ) : (
              <Button
                onClick={handleUpvote}
                // disabled={loggedInUser?.role === "ADMIN"}
              >
                {pendingLikeUnlike ? (
                  <Spinner size="sm" />
                ) : (
                  <div
                    className={`flex items-center gap-1 ${upVote?.includes(loggedInUser?._id as string) ? "text-green-700" : ""}`}
                  >
                    <i className="fa-solid fa-arrow-up" />
                    {upVote?.length}
                  </div>
                )}
              </Button>
            )}

            {/* ////down Vote button//// */}

            {!loggedInUser?.email ? (
              <AuthenticationModal
                buttonText={
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-arrow-down" />
                    {downVote?.length}
                  </div>
                }
                redirect={`/`}
              />
            ) : (
              <Button
                onClick={handleDownVote}
                // disabled={loggedInUser?.role === "ADMIN"}
              >
                {pendingDisikeUndislike ? (
                  <Spinner size="sm" />
                ) : (
                  <div
                    className={`flex items-center gap-1 ${downVote?.includes(loggedInUser?._id as string) ? "text-red-700" : ""}`}
                  >
                    <i className="fa-solid fa-arrow-down" />
                    {downVote?.length}
                  </div>
                )}
              </Button>
            )}
          </div>

          {/* ////view details button//// */}

          <div>
            {contentType === "Exclusive" &&
            ((loggedInUser?.role === "USER" &&
              loggedInUser?.userType === "NORMAL" &&
              loggedInUser?._id !== user?._id) ||
              !loggedInUser?.email) ? (
              <GetMembershipModal
                buttonText={<i className="fa-solid fa-info" />}
                buttonClassName="text-tiny text-white bg-black/20"
                buttonVariant="flat"
                buttonSize="sm"
                radius="full"
              />
            ) : (
              <Link href={`/recipe-details/${_id}`}>
                <Button>
                  <i className="fa-regular fa-eye" /> View Details
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeFeedCard;
