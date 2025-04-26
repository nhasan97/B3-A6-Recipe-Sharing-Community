"use client";

import "../../styles/textPreview.css";
import { IRecipe } from "@/src/types/recipe.type";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useUser } from "@/src/context/user.provider";
import { toast } from "sonner";
import {
  useChangeRecipeStatus,
  useDeleteRecipe,
} from "@/src/hooks/recipe.hook";
import EditRecipeModal from "../modals/EditRecipeModal";
import { Spinner } from "@nextui-org/spinner";
import GetMembershipModal from "../modals/GetMembershipModal";
import { useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/tooltip";
import { MdUnpublished } from "react-icons/md";
import { useRecipeProvider } from "@/src/context/recipes.providers";

const MembersRecipeCard = ({
  recipe,
  caller,
}: {
  recipe: IRecipe;
  caller?: string;
}) => {
  const {
    _id,
    title,
    images,
    rating,
    upVote,
    downVote,
    status,
    user,
    contentType,
  } = recipe || {};

  const { isLoading: loadingUser, user: loggedInUser } = useUser();
  const { refetchUsersRecipes } = useRecipeProvider();

  // -----------------------------------------------------------------------------------

  const router = useRouter();
  const handleNavigation = (pathName: string) => {
    router.push(pathName);
  };

  // -----------------------------------------------------------------------------------

  const {
    mutate: handleChangeRecipeStatus,
    isPending: pendingChangeRecipeStatus,
  } = useChangeRecipeStatus();

  const handlePublishUnpublishRecipe = (status: string) => {
    toast.warning("Are you sure to change recipe status?", {
      action: {
        label: "Yes",
        onClick: () => {
          try {
            handleChangeRecipeStatus({
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

  // -----------------------------------------------------------------------------------

  const { mutate: deleteRecipe, isPending: pendingDeleteRecipe } =
    useDeleteRecipe();

  const handleDeleteRecipe = (_id: string) => {
    toast.warning(
      "Are you sure to delete recipe? You won't be able to revert this!!",
      {
        action: {
          label: "Yes, delete recipe.",
          onClick: () => {
            try {
              deleteRecipe(
                {
                  recipeId: _id as string,
                },
                { onSuccess: () => refetchUsersRecipes() }
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

  // -----------------------------------------------------------------------------------
  return (
    <div className="bg-white w-full h-fit p-1 space-y-3 shadow-lg rounded-xl relative">
      {loadingUser ? (
        <Spinner size="lg" color="danger" />
      ) : (
        <div>
          <div className="flex flex-col justify-between items-start gap-3 mb-3">
            {/* //// Card heading //// */}
            <div className="w-full h-[40px] flex justify-between items-center">
              <Tooltip content={title}>
                <h4 className="text-preview text-gray-700 font-bold text-lg">
                  {title}
                </h4>
              </Tooltip>
              {contentType === "Exclusive" ? (
                <Image
                  removeWrapper
                  src={"/assets/icons/exclusive.png"}
                  alt=""
                  radius="none"
                  className="size-8 ml-1"
                />
              ) : (
                // <div className="bg-red-500 p-1 text-sm text-white rounded-full ">
                //   {contentType}
                // </div>
                ""
              )}
            </div>

            {/* //// Card rating //// */}
            <Rating style={{ maxWidth: 100 }} value={rating} readOnly />

            {/* //// up down votes //// */}
            <small className="text-default-500 flex items-center gap-6">
              <p className="space-x-1">
                <i className="fa-solid fa-arrow-up" />
                <span>{upVote?.length}</span>
              </p>
              <p className="space-x-1">
                <i className="fa-solid fa-arrow-down" />
                <span>{downVote?.length}</span>
              </p>
            </small>
          </div>

          {/* //// Card image //// */}
          <div className="w-full  rounded-xl overflow-hidden">
            <Image
              isZoomed
              removeWrapper
              alt="Card background"
              className="w-full h-[180px] 2xl:h-[250px] object-cover object-center rounded-xl"
              src={images[0]}
            />
          </div>

          {/* //// Card buttons //// */}
          <div className="before:bg-white/10 border-1 border-white/20 backdrop-blur-sm overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small z-10">
            {caller === "dashboard" &&
            loggedInUser?.email &&
            loggedInUser?.role === "ADMIN" ? (
              <div className="flex justify-between items-center gap-3">
                <Button
                  className="w-full text-tiny text-white bg-black/20"
                  variant="flat"
                  radius="full"
                  size="sm"
                  onClick={() => handleNavigation(`/recipe-details/${_id}`)}
                >
                  <i className="fa-solid fa-info" />
                </Button>

                {status === "PUBLISHED" ? (
                  <Button
                    className="w-full text-tiny text-white bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                    onClick={() => handlePublishUnpublishRecipe("UNPUBLISHED")}
                  >
                    {pendingChangeRecipeStatus
                      ? "Unpublishing..."
                      : "Unpublish"}
                  </Button>
                ) : (
                  <Button
                    className="w-full text-tiny text-white bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                    onClick={() => handlePublishUnpublishRecipe("PUBLISHED")}
                  >
                    {pendingChangeRecipeStatus ? "Publishing..." : "Publish"}
                  </Button>
                )}
              </div>
            ) : caller === "dashboard" &&
              loggedInUser?.email &&
              loggedInUser?.role === "USER" &&
              loggedInUser?._id === user?._id ? (
              <div className="flex justify-between items-center gap-3">
                <Button
                  className="flex-1 text-tiny text-white bg-black/20"
                  variant="flat"
                  radius="full"
                  size="sm"
                  onClick={() => handleNavigation(`/recipe-details/${_id}`)}
                >
                  <i className="fa-solid fa-info" />
                </Button>

                {status === "PUBLISHED" ? (
                  <>
                    <EditRecipeModal recipe={recipe} />
                    <Button
                      className="flex-1 text-tiny text-white bg-black/20"
                      size="sm"
                      radius="full"
                      onClick={() => handleDeleteRecipe(_id as string)}
                    >
                      {pendingDeleteRecipe ? (
                        <Spinner color="white" size="sm" />
                      ) : (
                        <i className="fa-solid fa-trash" />
                      )}
                    </Button>
                  </>
                ) : (
                  <div className="bg-red-700 flex items-center gap-1 px-1 py-2 text-tiny text-white text-center rounded-full ">
                    <MdUnpublished />
                    <p>Unpublished by Admin</p>
                  </div>
                )}
              </div>
            ) : caller !== "dashboard" &&
              contentType === "Exclusive" &&
              ((loggedInUser?.role === "USER" &&
                loggedInUser?.userType === "NORMAL" &&
                loggedInUser?._id !== user?._id) ||
                !loggedInUser?.email) ? (
              <GetMembershipModal
                buttonText={<i className="fa-solid fa-lock" />}
                buttonClassName="w-full text-tiny text-white bg-black/20"
                buttonVariant="flat"
                buttonSize="sm"
                radius="full"
              />
            ) : (
              <Button
                className="w-full text-tiny text-white bg-black/20"
                variant="flat"
                radius="full"
                size="sm"
                onClick={() => handleNavigation(`/recipe-details/${_id}`)}
              >
                <i className="fa-solid fa-info" /> View Details
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersRecipeCard;
