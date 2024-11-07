"use client";

import Container from "@/src/components/layouts/Container";
import CommentsSection from "@/src/components/modules/recipeDetailsPage/CommentsSection";
import RecipeDetails from "@/src/components/modules/recipeDetailsPage/RecipeDetails";
import LoadingSection from "@/src/components/shared/LoadingSection";
import { useUser } from "@/src/context/user.provider";
import { useGetComments } from "@/src/hooks/comment.hook";
import { useGetUsersRating } from "@/src/hooks/rating.hook";
import { useGetSingleRecipe } from "@/src/hooks/recipe.hook";
import { IUser } from "@/src/types/user.type";
import React from "react";

const RecipeDetailsPage = ({ params }: { params: any }) => {
  const { isLoading: loadingUser, user: loggedInUser } = useUser();

  const { isLoading: loadingUserRatingData, data: userRatingData } =
    useGetUsersRating(params.recipeID as string, loggedInUser?._id as string);

  const {
    isLoading: loadingRecipeData,
    data: recipeData,
    refetch: refetchRecipe,
  } = useGetSingleRecipe(params.recipeID);

  const {
    isLoading: loadingComments,
    data: commentData,
    refetch: refetchComments,
  } = useGetComments(params.recipeID);

  return (
    <Container>
      <div className="w-full h-[calc(100vh-64px)] grid grid-cols-1 xl:grid-cols-5 xl:gap-6 py-4">
        <div className="w-full col-span-1 xl:col-span-3 p-3 overflow-y-auto backdrop-blur-md rounded-lg shadow-xl">
          <div className="w-full">
            {loadingUser || loadingRecipeData || loadingUserRatingData ? (
              <LoadingSection />
            ) : (
              <RecipeDetails
                recipeData={recipeData}
                loggedInUser={loggedInUser as IUser}
                userRatingData={userRatingData}
                refetchRecipe={refetchRecipe}
              />
            )}
          </div>
        </div>

        <div className="w-full col-span-1 xl:col-span-2 p-3 overflow-y-auto backdrop-blur-md rounded-lg shadow-xl">
          <div className="w-full">
            {loadingComments ? (
              <LoadingSection />
            ) : (
              <CommentsSection
                recipeId={recipeData?.data?._id}
                commentData={commentData}
                refetchComments={refetchComments}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RecipeDetailsPage;
