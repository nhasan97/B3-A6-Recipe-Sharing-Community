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
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

const ShareRecipePage = () => {
  const { user } = useUser();
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = {
    readonly: false,
    placeholder: "Start typings...",
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

    handleShareRecipe(formData);
  };

  return (
    <div className="h-screen">
      <DashboardContainer>
        {/* <Helmet>
      <title>Blooms & Beyond | Dashboard | Products</title>
    </Helmet> */}

        {/* <Title title={"Products"}></Title> */}

        <div className="w-full h-full flex flex-col overflow-y-auto">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="w-full flex flex-col xl:flex-row gap-6">
                <div className="w-full h-full flex-1 flex flex-col justify-between gap-6">
                  {/* --------------------------------------------------------------------------------------------------------------------------- */}

                  <FXInput name="title" label="Title" />

                  {/* --------------------------------------------------------------------------------------------------------------------------- */}

                  <Controller
                    name="instruction"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <label htmlFor={field.name}>Instructions</label>
                        {/* <JoditEditor
                          value={content}
                          config={config}
                          onBlur={(newContent) => {
                            setContent(newContent);
                            field.onChange(newContent);
                          }}
                        /> */}
                      </div>
                    )}
                  />

                  {/* --------------------------------------------------------------------------------------------------------------------------- */}

                  <div className="w-full p-3 rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400">
                    <div className="flex justify-between items-center">
                      <h1>Ingredients</h1>
                      <Button onClick={handleAppendIngredients}>Append</Button>
                    </div>

                    <div className="space-y-6">
                      {IFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-6">
                          <FXInput
                            name={`ingredients.${index}.value`}
                            label="Ingredient"
                          />
                          <Button onClick={() => IRemove(index)}>Remove</Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* --------------------------------------------------------------------------------------------------------------------------- */}

                  <FXSelect
                    name="category"
                    label="Category"
                    options={categoryOptions}
                  />

                  {/* --------------------------------------------------------------------------------------------------------------------------- */}
                </div>

                <Divider orientation="vertical" className="hidden xl:flex" />

                <div className="w-full h-full flex-1 flex flex-col justify-between gap-6">
                  {/* --------------------------------------------------------------------------------------------------------------------------- */}

                  <FXInput name="cookingTime" label="Cooking Time" />

                  {/* --------------------------------------------------------------------------------------------------------------------------- */}

                  <FXSelect
                    name="contentType"
                    label="Content Type"
                    options={contentTypeOptions}
                  />

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
                      <Button onClick={handleAppendTags}>Append</Button>
                    </div>

                    <div className="space-y-6">
                      {TFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-6">
                          <FXInput name={`tags.${index}.value`} label="Tag" />
                          <Button onClick={() => TRemove(index)}>Remove</Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* --------------------------------------------------------------------------------------------------------------------------- */}
                </div>
              </div>
              <div className="flex justify-center items-center mt-6">
                <Button type="submit" className="w-[20%]">
                  {isPending ? "Posting..." : "Post"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default ShareRecipePage;
