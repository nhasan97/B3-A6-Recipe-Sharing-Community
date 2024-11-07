"use client";

import React, { useEffect, useState } from "react";
import FXModal from "./FXModal";
import FXInput from "../form/FXInput";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import FXSelect from "../form/FXSelect";
import FXForm from "../form/FXForm";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { IRecipe } from "@/src/types/recipe.type";
import { useUpdateRecipe } from "@/src/hooks/recipe.hook";
import dynamic from "next/dynamic";
import {
  categoryOptions,
  contentTypeOptions,
} from "@/src/constants/recipe.constants";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const EditRecipeModal = ({ recipe }: { recipe: IRecipe }) => {
  const methods = useForm();
  const { control } = methods;
  const [content, setContent] = useState(recipe?.instruction || "");
  const config = {
    readonly: false,
    placeholder: "Start typing...",
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

  const { mutate: handleUpdateRecipe, isPending } = useUpdateRecipe();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const postData = {
      ...data,

      ingredients: data.ingredients.map(
        (ingredient: string | { value: string }) =>
          typeof ingredient === "string" ? ingredient : ingredient.value
      ),

      tags: data.tags.map((tag: string | { value: string }) =>
        typeof tag === "string" ? tag : tag.value
      ),
    };

    console.log(postData);

    // formData.append("data", JSON.stringify(postData));

    // for (let image of imageFiles) {
    //   formData.append("itemImages", image);
    // }

    // handleUpdateRecipe({
    //   recipeId: recipe?._id as string,
    //   updatedRecipeData: formData,
    // });
  };

  // Effect to synchronize the JoditEditor content with the form
  useEffect(() => {
    setContent(recipe?.instruction || "");
  }, [recipe]);
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
      // isIconOnly
    >
      <FXForm onSubmit={onSubmit} defaultValues={recipe}>
        <div className="w-full h-full flex flex-col xl:flex-row gap-6">
          <div className="w-full h-full flex-1 flex flex-col justify-between gap-6">
            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            <FXInput name="title" label="Title" />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            <Controller
              name="instruction"
              control={control}
              defaultValue={content} // Default value for the editor
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

            <FXInput name="cookingTime" label="Cooking Time" />

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            <FXSelect
              name="contentType"
              label="Content Type"
              options={contentTypeOptions}
            />

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

            {/* <Divider className="my-4" /> */}

            <div className="w-full p-3 rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400">
              <div className="flex justify-between items-start ">
                <div>
                  <h1 className="text-sm">Ingredients</h1>

                  <ul className="h-[100px] my-3 overflow-y-auto">
                    {recipe?.ingredients?.map((ingredient) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <Button onClick={handleAppendIngredients}>Append</Button>
              </div>

              <div className="space-y-6">
                {IFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-6">
                    <FXInput
                      name={`ingredients.${index + recipe?.ingredients?.length}.value`}
                      label="Ingredient"
                    />
                    <Button onClick={() => IRemove(index)}>Remove</Button>
                  </div>
                ))}
              </div>
            </div>

            {/* <Divider className="my-4" /> */}

            {/* --------------------------------------------------------------------------------------------------------------------------- */}

            <div className="">
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
                {recipe?.images?.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt="item"
                    className="size-20 object-cover object-center rounded-md"
                  />
                ))}

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

            {/* <Divider className="my-4" /> */}
            <div className="w-full p-3 rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400">
              <div className="flex justify-between items-center">
                <div className="">
                  <h1 className="text-sm">Tags</h1>

                  <ul className="flex flex-wrap gap-3">
                    {recipe?.tags?.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
                <Button onClick={handleAppendTags}>Append</Button>
              </div>
              <div className="space-y-6">
                {TFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-6">
                    <FXInput
                      name={`tags.${index + recipe?.tags!.length}.value`}
                      label="Tag"
                    />
                    <Button onClick={() => TRemove(index)}>Remove</Button>
                  </div>
                ))}
              </div>
              {/* <Divider className="my-4" /> */}
            </div>
            {/* --------------------------------------------------------------------------------------------------------------------------- */}
          </div>
        </div>
        <div className="flex justify-center items-center mt-6">
          <Button type="submit" className="w-[20%]">
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </FXForm>
    </FXModal>
  );
};

export default EditRecipeModal;
