import React from "react";

import {
  categoryOptions,
  contentTypeOptions,
} from "@/src/constants/recipe.constants";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import "../../../styles/jodit.css";
import dynamic from "next/dynamic";
import { IRecipe } from "@/src/features/recipe/types/recipe.type";
import FXInput from "@/src/components/UI/form/FXInput";
import FXSelect from "@/src/components/UI/form/FXSelect";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false }) as any;

const EditRecipeFields = ({
  recipe,
  content,
  setContent,
  existingImages,
  setExisitingImages,
  imageFiles,
  setImageFiles,
  imagePreviews,
  setImagePreviews,
}: {
  recipe: IRecipe;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  existingImages: string[];
  setExisitingImages: React.Dispatch<React.SetStateAction<string[]>>;
  imageFiles: File[];
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreviews: string[];
  setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { control } = useFormContext();

  const joditConfig = {
    readonly: false,
    placeholder: "Cooking Instructions...",
    toolbarButtonSize: "small",
    theme: "default",
    minHeight: 300,
    toolbarAdaptive: true,
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

  const handleAppendIngredients = (value: any) => {
    IAppend(value);
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

  const handleAppendTags = (value: any) => {
    TAppend(value);
  };

  // -----------------------------------------------------------------------------------

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

  const removeExistingImage = (index: number) => {
    const updatedImageList = existingImages.filter(
      (img) => existingImages.indexOf(img) !== index
    );

    setExisitingImages(updatedImageList);

    // if (index > -1) {
    //   existingImages.splice(index, 1);
    // }
  };

  const removeNewImage = (index: number) => {
    const updatedImageFileList = imageFiles.filter(
      (image) => imageFiles.indexOf(image) !== index
    );
    const updatedImagePreviewList = imagePreviews.filter(
      (imageDataUrl) => imagePreviews.indexOf(imageDataUrl) !== index
    );

    setImageFiles(updatedImageFileList);
    setImagePreviews(updatedImagePreviewList);

    // if (index > -1) {
    //   existingImages.splice(index, 1);
    // }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h4>Basic Information</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* --------------------------------------------------------------------------------------------------------------------------- */}

        <FXInput name="title" label="Title" />

        {/* --------------------------------------------------------------------------------------------------------------------------- */}

        <FXSelect name="category" label="Category" options={categoryOptions} />

        {/* --------------------------------------------------------------------------------------------------------------------------- */}

        <FXInput name="cookingTime" label="Cooking Time" />

        {/* --------------------------------------------------------------------------------------------------------------------------- */}

        <FXSelect
          name="contentType"
          label="Content Type"
          options={contentTypeOptions}
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
              onClick={() => handleAppendIngredients("")}
              className="bg-white"
              isIconOnly
            >
              <i className="fa-solid fa-plus text-red-700" />
            </Button>
          </div>

          <div className="space-y-6">
            {IFields.map((item, index) => (
              <div key={item.id} className="flex items-center gap-6">
                <Controller
                  render={({ field }) => (
                    <FXInput {...field} label="Ingredient" />
                  )}
                  // @ts-ignore
                  defaultValue={item}
                  name={`ingredients.${index}`}
                  // name={`ingredients.${index}.value`}
                  control={control}
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
          defaultValue={content}
          render={({ field }) => (
            <div>
              <label htmlFor={field.name}>Instructions</label>
              <JoditEditor
                value={content}
                config={joditConfig}
                onBlur={(newContent: string) => {
                  setContent(newContent);
                }}
              />
            </div>
          )}
        />

        {/* <FXTextarea name="instruction" label="Instructions" /> */}

        {/* --------------------------------------------------------------------------------------------------------------------------- */}
      </div>

      <Divider />

      <h4>Media and Tags</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            {existingImages.map((image, index) => (
              <div key={image} className="relative">
                <img
                  key={image}
                  src={image}
                  alt="item"
                  className="size-20 object-cover object-center rounded-md"
                />
                <Button
                  isIconOnly
                  variant="solid"
                  size="sm"
                  radius="full"
                  className="absolute top-0 right-0 translate-x-[50%] -translate-y-[50%]"
                  onClick={() => {
                    removeExistingImage(index);
                  }}
                >
                  x
                </Button>
              </div>
            ))}

            {imagePreviews.length > 0 &&
              imagePreviews.map((imageDataUrl, index) => (
                <div key={imageDataUrl} className="relative">
                  <img
                    key={imageDataUrl}
                    src={imageDataUrl}
                    alt="item"
                    className="size-20 object-cover object-center rounded-md"
                  />
                  <Button
                    isIconOnly
                    variant="solid"
                    size="sm"
                    radius="full"
                    className="absolute top-0 right-0 translate-x-[50%] -translate-y-[50%]"
                    onClick={() => {
                      removeNewImage(index);
                    }}
                  >
                    x
                  </Button>
                </div>
              ))}
          </div>
        </div>

        {/* --------------------------------------------------------------------------------------------------------------------------- */}

        <div className="w-full overflow-y-auto p-3 rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400">
          <div className="flex justify-between items-center">
            <h1>Tags</h1>
            <Button
              onClick={() => handleAppendTags("")}
              className="bg-white"
              isIconOnly
            >
              <i className="fa-solid fa-plus text-red-700" />
            </Button>
          </div>

          <div className="space-y-6">
            {TFields.map((item, index) => (
              <div key={item.id} className="flex items-center gap-6">
                <Controller
                  render={({ field }) => <FXInput {...field} label="Tag" />}
                  // @ts-ignore
                  defaultValue={item}
                  name={`tags.${index}`}
                  control={control}
                />

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
  );
};

export default EditRecipeFields;
