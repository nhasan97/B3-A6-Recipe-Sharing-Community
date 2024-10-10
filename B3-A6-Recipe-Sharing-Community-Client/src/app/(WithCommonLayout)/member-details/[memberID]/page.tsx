import Container from "@/src/components/layouts/Container";
import AuthenticationModal from "@/src/components/modals/AuthenticationModal";
import MembersRecipeCard from "@/src/components/UI/MembersRecipeCard";
import axiosInstance from "@/src/lib/AxiosInstance";
import { getCurrentUser } from "@/src/services/AuthService";
import { IRecipe } from "@/src/types/recipe.type";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import React from "react";

const MemberDetailsPage = async ({ params }: { params: any }) => {
  const user = await getCurrentUser();

  const { data: userData } = await axiosInstance.get(
    `/users/${params.memberID}`
  );

  const { data: userRecipeData } = await axiosInstance.get(
    `/recipes/user/${params.memberID}`
  );

  return (
    <Container>
      <div className="flex flex-col justify-center items-center gap-3">
        <Image
          alt="NextUI hero Image"
          src={userData?.data?.profilePhoto}
          className="size-[200px] rounded-full"
        />

        <h1 className="text-3xl">{userData?.data?.name}</h1>
        <p>{userData?.data?.email}</p>

        <p className="my-6">{userData?.data?.bio}</p>

        <div className="flex items-center gap-3">
          <p>Followers : {userData?.data?.followers?.length}</p>
          <Divider orientation="vertical" />
          <p>Following : {userData?.data?.following?.length}</p>
          <Divider orientation="vertical" />

          {!user?.email ? (
            <AuthenticationModal
              buttonText="Follow"
              redirect={`/member-details/${params.memberID}`}
            />
          ) : (
            <Button
              disabled={
                user?.role === "ADMIN" || user?.email === userData?.data?.email
              }
            >
              Follow
            </Button>
          )}
        </div>
      </div>

      <div>
        <h2>Recipes By {userData?.data?.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {userRecipeData?.data?.map((recipe: IRecipe) => (
            <MembersRecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default MemberDetailsPage;
