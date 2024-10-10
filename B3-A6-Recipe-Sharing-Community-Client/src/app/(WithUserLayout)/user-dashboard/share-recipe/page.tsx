"use client";

import FXInput from "@/src/components/form/FXInput";
import FXSelect from "@/src/components/form/FXSelect";
import FXTextarea from "@/src/components/form/FXTextarea";
import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import { useUser } from "@/src/context/user.provider";
import { useShareRecipe } from "@/src/hooks/recipe.hook";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import React, { useState } from "react";
import {
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

  // -----------------------------------------------------------------------------------
  const contentTypeOptions = [
    { key: "Open", label: "Open" },
    { key: "Exclusive", label: "Exclusive" },
  ];

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

  const { mutate: handleShareRecipe } = useShareRecipe();

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

        <div className="w-full flex flex-col">
          <FormProvider {...methods}>
            <h1>Post a found item</h1>
            <Divider className="my-4" />
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* --------------------------------------------------------------------------------------------------------------------------- */}

              <FXInput name="title" label="Title" />

              {/* --------------------------------------------------------------------------------------------------------------------------- */}

              <FXTextarea name="instruction" label="Instructions" />

              {/* --------------------------------------------------------------------------------------------------------------------------- */}

              <Divider className="my-4" />

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

              <Divider className="my-4" />

              {/* --------------------------------------------------------------------------------------------------------------------------- */}
              <div className="flex gap-6">
                <div className="flex-1">
                  <FXInput name="cookingTime" label="Cooking Time" />
                </div>

                {/* --------------------------------------------------------------------------------------------------------------------------- */}

                <div className="flex-1">
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
                <div className="flex-1">
                  <FXSelect
                    name="contentType"
                    label="Content Type"
                    options={contentTypeOptions}
                  />
                </div>
              </div>

              {/* --------------------------------------------------------------------------------------------------------------------------- */}

              <Divider className="my-4" />

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

              <Divider className="my-4" />

              {/* --------------------------------------------------------------------------------------------------------------------------- */}

              <Button type="submit">Post</Button>
            </form>
          </FormProvider>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default ShareRecipePage;
