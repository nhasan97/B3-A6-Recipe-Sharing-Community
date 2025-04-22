"use client";

import { IRecipe } from "@/src/types/recipe.type";
import React, { useEffect, useState } from "react";
import ImageGallery from "../../UI/ImageGallery";
import IngredientCard from "../../UI/IngredientCard";
import { Button } from "@nextui-org/button";
import AuthenticationModal from "../../modals/AuthenticationModal";
import {
  useDisikeUndislikeRecipe,
  useLikeUnlikeRecipe,
} from "@/src/hooks/recipe.hook";
import { Spinner } from "@nextui-org/spinner";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { usePostRating } from "@/src/hooks/rating.hook";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { IUser } from "@/src/types/user.type";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

const RecipeDetails = ({
  recipeData,
  loggedInUser,
  userRatingData,
  refetchRecipe,
}: {
  recipeData: { data: IRecipe };
  loggedInUser: IUser;
  userRatingData: {
    data: { userAlreadyRated: number; numberOfRecipeRatings: number };
  };
  refetchRecipe: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  /*
  

  -----handling Up vote------------------------------------------------------------------------------------------------------- */
  const [likeStatus, setLikeStatus] = useState("");

  const { mutate: handleLikeUnlikeRecipe, isPending: pendingLikeUnlike } =
    useLikeUnlikeRecipe();

  useEffect(() => {
    if (recipeData?.data?.upVote?.includes(loggedInUser?._id as string)) {
      setLikeStatus("unlike");
    } else {
      setLikeStatus("like");
    }
  }, [recipeData?.data?.upVote, loggedInUser]);

  const handleUpvote = () => {
    const newLikeStatus = likeStatus === "like" ? "unlike" : "like";

    const data = {
      recipeId: recipeData?.data?._id as string,
      loggedInUserId: loggedInUser?._id as string,
      likeStatus: likeStatus,
    };

    handleLikeUnlikeRecipe(data, {
      onSuccess: () => {
        setLikeStatus(newLikeStatus);
        refetchRecipe();
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
    if (recipeData?.data?.downVote?.includes(loggedInUser?._id as string)) {
      setDislikeStatus("undislike");
    } else {
      setDislikeStatus("dislike");
    }
  }, [recipeData?.data?.downVote, loggedInUser]);

  const handleDownVote = () => {
    const newDislikeStatus =
      dislikeStatus === "dislike" ? "undislike" : "dislike";

    const data = {
      recipeId: recipeData?.data?._id as string,
      loggedInUserId: loggedInUser?._id as string,
      dislikeStatus: dislikeStatus,
    };

    handleDislikeUndislikeRecipe(data, {
      onSuccess: () => {
        setDislikeStatus(newDislikeStatus);
        refetchRecipe();
      },
    });
  };

  /*

  
  -----handling rating recipe------------------------------------------------------------------------------------------------------- */
  const { handleSubmit, control } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      rating: 0,
    },
  });

  const { mutate: handlePostRating, isPending: pendingRating } =
    usePostRating();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const ratingPost = {
      user: loggedInUser?._id,
      recipe: recipeData?.data?._id,
      rating: parseInt(data.rating),
    };

    handlePostRating(ratingPost);
  };

  // -----------------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* ----------------------------------------------------------------------------------------- */}

      <h1 className="text-4xl">{recipeData?.data?.title}</h1>

      {/* ----------------------------------------------------------------------------------------- */}

      <p>Posted by {recipeData?.data?.user?.name}</p>

      {/* ----------------------------------------------------------------------------------------- */}

      <div className="flex items-center gap-6">
        <Rating
          style={{ maxWidth: 120 }}
          value={Math.round(recipeData?.data?.rating)}
          readOnly
        />
        <p>({userRatingData?.data?.numberOfRecipeRatings})</p>
      </div>

      {/* ----------------------------------------------------------------------------------------- */}

      <ImageGallery images={recipeData?.data?.images} />

      {/* ----------------------------------------------------------------------------------------- */}

      <p className="w-fit bg-default-200 p-2 rounded-full">
        Cooking Time {recipeData?.data?.cookingTime}
      </p>

      {/* ----------------------------------------------------------------------------------------- */}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Ingredients Checklist</h3>
        <div className="space-y-3">
          {recipeData?.data?.ingredients?.map((ingredient: string) => (
            <IngredientCard key={ingredient} ingredient={ingredient} />
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------------------------------------------- */}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Instructions</h3>

        <p
          className="text-base text-justify"
          dangerouslySetInnerHTML={{ __html: recipeData?.data?.instruction }}
        />
      </div>

      {/* ----------------------------------------------------------------------------------------- */}

      {!loggedInUser?.email ? (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* ////up Vote button//// */}
            <AuthenticationModal
              buttonText={
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-arrow-up" />
                  {recipeData?.data?.upVote?.length}
                </div>
              }
              redirect={`/`}
            />

            {/* ////down Vote button//// */}
            <AuthenticationModal
              buttonText={
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-arrow-down" />
                  {recipeData?.data?.downVote?.length}
                </div>
              }
              redirect={`/`}
            />
          </div>

          <div>
            {/* ////rating button//// */}
            <AuthenticationModal
              buttonText="Rate Recipe!"
              buttonClassName="bg-red-700 text-white"
              redirect={`recipe-details/${recipeData?.data?._id}`}
            />
          </div>
        </div>
      ) : (
        <div className="sp">
          <div className="flex items-center gap-3">
            {/* ////up Vote button//// */}
            <Button
              onClick={handleUpvote}
              // disabled={loggedInUser?.role === "ADMIN"}
            >
              {pendingLikeUnlike ? (
                <Spinner size="sm" />
              ) : (
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-arrow-up" />
                  {recipeData?.data?.upVote?.length}
                </div>
              )}
            </Button>

            {/* ////down Vote button//// */}
            <Button
              onClick={handleDownVote}
              // disabled={loggedInUser?.role === "ADMIN"}
            >
              {pendingDisikeUndislike ? (
                <Spinner size="sm" />
              ) : (
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-arrow-down" />
                  {recipeData?.data?.downVote?.length}
                </div>
              )}
            </Button>
          </div>

          <div className="my-6">
            {/* ////rating form//// */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-start gap-3"
            >
              <div id="rating_label" className="text-xl font-semibold">
                Rate Recipe
              </div>

              <Controller
                control={control}
                name="rating"
                rules={{
                  validate: (rating) => rating > 0,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Rating
                    value={value}
                    onChange={onChange}
                    style={{ maxWidth: 220 }}
                    visibleLabelId="rating_label"
                    onBlur={onBlur}
                    isDisabled={
                      userRatingData?.data?.userAlreadyRated === 1
                      // ||
                      // loggedInUser?.role === "ADMIN"
                    }
                  />
                )}
              />

              <Button type="submit" className="bg-red-700 text-white">
                {pendingRating ? "Posting..." : "Post"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------------------------------- */}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tags</h3>
        <div className="flex flex-wrap gap-3">
          {recipeData?.data?.tags?.map((tag) => (
            <div
              key={tag}
              className="px-3 py-1 bg-[#6C6555] text-white rounded-full"
            >
              <p>{tag}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
