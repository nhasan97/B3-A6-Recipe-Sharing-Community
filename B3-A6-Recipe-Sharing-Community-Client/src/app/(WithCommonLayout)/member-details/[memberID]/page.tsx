"use client";

import Container from "@/src/components/layouts/Container";
import DisplayMembersInfo from "@/src/components/modules/member-details/DisplayMembersInfo";
import LoadingSection from "@/src/components/shared/LoadingSection";
import NoData from "@/src/components/shared/NoData";
import DisplayRecipes from "@/src/components/UI/DisplayRecipes";
import { useUser } from "@/src/context/user.provider";
import {
  useGetUsersRecipeCount,
  useGetUsersRecipes,
} from "@/src/hooks/recipe.hook";
import { useGetSingleUser } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types/user.type";
import React from "react";

const MemberDetailsPage = ({ params }: { params: any }) => {
  const { isLoading: loadingLoggedInUser, user: loggedInUser } = useUser();

  const { isLoading: loadingMemberData, data: memberData } = useGetSingleUser(
    params.memberID
  );

  const { isLoading: loadingUsersRecipeCount, data: loadedUsersRecipeCount } =
    useGetUsersRecipeCount(params.memberID);

  const { isLoading: loadingMembersRecipes, data: membersRecipeData } =
    useGetUsersRecipes(
      params.memberID,
      "",
      "",
      "",
      "",
      "",
      0,
      loadedUsersRecipeCount?.data?.publishedRecipes
    );

  return (
    <Container>
      <div className="w-full xl:h-[calc(100vh-64px)] grid grid-cols-1 xl:grid-cols-5 gap-12 xl:gap-6 py-4">
        <div className="w-full col-span-1 xl:col-span-2 xl:p-3 xl:overflow-y-auto backdrop-blur-md rounded-lg xl:shadow-xl">
          {loadingMemberData || loadingLoggedInUser ? (
            <LoadingSection />
          ) : (
            <DisplayMembersInfo
              member={memberData}
              loggedInUser={loggedInUser as IUser}
            />
          )}
        </div>

        <div className="w-full col-span-1 xl:col-span-3 xl:p-3 xl:overflow-y-auto backdrop-blur-md rounded-lg">
          <h1 className="text-2xl mb-6">Recipes by {memberData?.data?.name}</h1>
          {loadingUsersRecipeCount || loadingMembersRecipes ? (
            <LoadingSection />
          ) : membersRecipeData?.data?.length ? (
            <DisplayRecipes
              recipeData={membersRecipeData?.data}
              caller={"memberDetails"}
            />
          ) : (
            <NoData text={"No Recipes Found"} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default MemberDetailsPage;
