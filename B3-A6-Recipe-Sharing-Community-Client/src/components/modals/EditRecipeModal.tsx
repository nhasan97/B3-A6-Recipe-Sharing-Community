"use client";

import React, { useState } from "react";
import FXModal from "./FXModal";
import { Button } from "@nextui-org/button";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { IRecipe } from "@/src/types/recipe.type";
import { useUpdateRecipe } from "@/src/hooks/recipe.hook";
import { useRecipeProvider } from "@/src/context/recipes.providers";
import EditRecipeFields from "../form/EditRecipeFields";

const EditRecipeModal = ({ recipe }: { recipe: IRecipe }) => {
  const { refetchUsersRecipes } = useRecipeProvider();
  const [content, setContent] = useState(recipe?.instruction || "");
  const [existingImages, setExisitingImages] = useState(recipe?.images);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const methods = useForm({
    defaultValues: {
      title: recipe?.title,
      category: recipe?.category,
      cookingTime: recipe?.cookingTime,
      contentType: recipe?.contentType,
      ingredients: recipe?.ingredients,
      instruction: recipe?.instruction,
      images: recipe?.images,
      tags: recipe?.tags,
    },
  });

  // -----------------------------------------------------------------------------------

  const { mutate: handleUpdateRecipe, isPending } = useUpdateRecipe();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const postData = {
      ...data,

      instruction: content,
      images: [...existingImages],
      ingredients: data.ingredients.map(
        (ingredient: string | { value: string }) =>
          typeof ingredient === "string" ? ingredient : ingredient.value
      ),

      tags: data.tags.map((tag: string | { value: string }) =>
        typeof tag === "string" ? tag : tag.value
      ),
    };

    formData.append("data", JSON.stringify(postData));

    // if (imageFiles.length > 0) {
    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }
    // }
    handleUpdateRecipe(
      {
        recipeId: recipe?._id as string,
        updatedRecipeData: formData,
      },
      { onSuccess: () => refetchUsersRecipes() }
    );
  };

  // -----------------------------------------------------------------------------------

  return (
    <FXModal
      title="Edit Recipe"
      size="5xl"
      buttonText={
        <i className="fa-solid fa-pen-to-square  group-hover:transition-all" />
      }
      buttonClassName="flex-1 text-tiny text-white bg-black/20 group"
      buttonSize="sm"
      radius="full"
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* <FXForm onSubmit={onSubmit} defaultValues={recipe}> */}
          <EditRecipeFields
            recipe={recipe}
            content={content}
            setContent={setContent}
            existingImages={existingImages}
            setExisitingImages={setExisitingImages}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
          />
          <div className="flex justify-center items-center mt-6">
            <Button
              type="submit"
              className="w-[20%] bg-red-700 font-semibold text-white"
              size="lg"
              radius="lg"
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
          {/* </FXForm> */}
        </form>
      </FormProvider>
    </FXModal>
  );
};

export default EditRecipeModal;
