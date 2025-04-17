"use client";

import FXInput from "@/src/components/form/FXInput";
import FXSelect from "@/src/components/form/FXSelect";
import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import {
  categoryOptions,
  contentTypeOptions,
} from "@/src/constants/recipe.constants";
import { useUser } from "@/src/context/user.provider";
import { useShareRecipe } from "@/src/hooks/recipe.hook";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import React, { useState } from "react";
import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useRecipeProvider } from "@/src/context/recipes.providers";
import DashboardPageTitle from "@/src/components/shared/DashboardPageTitle";
import "../../../../styles/jodit.css";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false }) as any;

const ShareRecipePage = () => {
  const { user } = useUser();
  const { refetchUsersRecipes } = useRecipeProvider();
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const [content, setContent] = useState("");
  const joditConfig = {
    readonly: false,
    placeholder: "Cooking Instructions...",
    toolbarButtonSize: "small", // Size of toolbar buttons: "small", "medium", "large"
    theme: "default", // Use "default" or "dark" theme
    minHeight: 300, // Minimum height of the editor
    toolbarAdaptive: true, // Makes toolbar responsive to screen size
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "link",
      "image",
      "table",
    ],
  };

  // -----------------------------------------------------------------------------------

  const {
    fields: IFields,
    append: IAppend,
    remove: IRemove,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const handleAppendIngredients = () => {
    IAppend({ name: "ingredients" });
  };

  // -----------------------------------------------------------------------------------

  const {
    fields: TFields,
    append: TAppend,
    remove: TRemove,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const handleAppendTags = () => {
    TAppend({ name: "tags" });
  };

  // -----------------------------------------------------------------------------------

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const handlImageChange = (e: any) => {
    const file = e.target.files[0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  // -----------------------------------------------------------------------------------

  const { mutate: handleShareRecipe, isPending } = useShareRecipe();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const postData = {
      ...data,
      ingredients: data.ingredients.map(
        (ingredient: { value: string }) => ingredient.value
      ),
      rating: 0,
      upVote: [],
      downVote: [],
      tags: data.tags.map((tag: { value: string }) => tag.value),
      status: "PUBLISHED",
      user: user?._id,
    };

    // console.log(postData);

    formData.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }

    handleShareRecipe(formData, { onSuccess: () => refetchUsersRecipes() });
  };

  const title = {
    mainTitle: "Share Recipes",
  };

  return (
    <div className="h-screen bg-[url('/assets/images/users-bg-mobile.png')] md:bg-[url('/assets/images/users-bg-tab.png')] xl:bg-[url('/assets/images/users-bg.png')] bg-cover bg-center bg-no-repeat">
      <DashboardContainer>
        <DashboardPageTitle title={title} />

        {/* <div className="w-full"> */}

        <div className="w-full h-full flex flex-col bg-black/20 backdrop-blur-md p-5 md:p-10 rounded-lg overflow-y-auto">
          <h3 className="my-2 md:text-2xl font-bold ">
            Share the flavors of your kitchen with the world!
          </h3>
          <p className="hidden md:flex mb-4 text-[#696969]">
            Your recipe could inspire others to create memories and discover new
            favorites.
          </p>

          <div className="h-full overflow-y-auto">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="w-full flex flex-col gap-6">
                  <h4>Basic Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* --------------------------------------------------------------------------------------------------------------------------- */}
                    <FXInput name="title" label="Title" required={true} />
                    {/* --------------------------------------------------------------------------------------------------------------------------- */}
                    <FXSelect
                      name="category"
                      label="Category"
                      options={categoryOptions}
                      required={true}
                    />
                    {/* --------------------------------------------------------------------------------------------------------------------------- */}
                    <FXInput
                      name="cookingTime"
                      label="Cooking Time"
                      required={true}
                    />
                    {/* --------------------------------------------------------------------------------------------------------------------------- */}
                    <FXSelect
                      name="contentType"
                      label="Content Type"
                      options={contentTypeOptions}
                      required={true}
                    />
                    {/* --------------------------------------------------------------------------------------------------------------------------- */}
                  </div>

                  <Divider />

                  <h4>Instructions and Ingredients</h4>
                  <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
                    {/* --------------------------------------------------------------------------------------------------------------------------- */}

                    <div className="w-full overflow-y-auto p-3 rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400">
                      <div className="flex justify-between items-center">
                        <h1>Ingredients</h1>
                        <Button
                          onClick={handleAppendIngredients}
                          className="bg-white"
                          isIconOnly
                        >
                          <i className="fa-solid fa-plus text-red-700" />
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {IFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="flex items-center gap-6"
                          >
                            <FXInput
                              name={`ingredients.${index}.value`}
                              label="Ingredient"
                            />
                            <Button
                              onClick={() => IRemove(index)}
                              className="border border-white"
                              isIconOnly
                            >
                              <i className="fa-solid fa-minus text-red-700" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* --------------------------------------------------------------------------------------------------------------------------- */}

                    <Controller
                      name="instruction"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <div>
                          {/* <label htmlFor={field.name}>Instructions</label> */}
                          <JoditEditor
                            value={content}
                            config={joditConfig}
                            onBlur={(newContent: string) => {
                              setContent(newContent);
                              field.onChange(newContent);
                            }}
                          />
                        </div>
                      )}
                    />

                    {/* <FXTextarea
                      name="instruction"
                      label="Instructions"
                      required={true}
                    /> */}

                    {/* --------------------------------------------------------------------------------------------------------------------------- */}
                  </div>

                  <Divider />

                  <h4>Media and Tags</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* --------------------------------------------------------------------------------------------------------------------------- */}

                    <div>
                      <div>
                        <label
                          className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                          htmlFor="image"
                        >
                          Upload image
                        </label>
                        <input
                          type="file"
                          multiple
                          id="image"
                          name="title"
                          className="hidden"
                          onChange={(e) => handlImageChange(e)}
                        />
                      </div>

                      <div className="flex items-center gap-4 my-4 flex-wrap">
                        {imagePreviews.length > 0 &&
                          imagePreviews.map((imageDataUrl) => (
                            <img
                              key={imageDataUrl}
                              src={imageDataUrl}
                              alt="item"
                              className="size-20 object-cover object-center rounded-md"
                            />
                          ))}
                      </div>
                    </div>

                    {/* --------------------------------------------------------------------------------------------------------------------------- */}

                    <div className="w-full p-3 rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400">
                      <div className="flex justify-between items-center">
                        <h1>Tags</h1>
                        <Button
                          onClick={handleAppendTags}
                          className="bg-white"
                          isIconOnly
                        >
                          <i className="fa-solid fa-plus  text-red-700" />
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {TFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="flex items-center gap-6"
                          >
                            <FXInput name={`tags.${index}.value`} label="Tag" />
                            <Button
                              onClick={() => TRemove(index)}
                              className="border border-white"
                              isIconOnly
                            >
                              <i className="fa-solid fa-minus text-red-700" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* --------------------------------------------------------------------------------------------------------------------------- */}
                  </div>
                </div>
                <div className="flex justify-center items-center mt-6">
                  <Button
                    type="submit"
                    className="w-[20%] bg-red-700 text-white"
                    size="lg"
                    radius="lg"
                  >
                    {isPending ? "Posting..." : "Post"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default ShareRecipePage;
