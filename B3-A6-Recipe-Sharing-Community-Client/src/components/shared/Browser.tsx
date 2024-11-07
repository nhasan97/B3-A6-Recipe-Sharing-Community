"use client";

import {
  categoryOptions,
  contentTypeOptions,
  sortOptions,
} from "@/src/constants/recipe.constants";
import { useRecipeProvider } from "@/src/context/recipes.providers";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import React, { useState } from "react";
import { BiReset } from "react-icons/bi";

const Browser = ({
  searchBox = true,
  searchBoxText = "Search by title, ingredients, cooking time and tags",
  categoryFilter = true,
  contentTypeFilter = true,
  sortBox = true,
}) => {
  const {
    searchTerm,
    setSearchTerm,
    setCategory,
    contentType,
    setContentType,
    setSort,
    resetBrowser,
  } = useRecipeProvider();

  const [openSearchFilterBox, setOpenSearchFilterBox] = useState(false);

  return (
    <div>
      {/*----------------- pc view -----------------*/}
      <div className="hidden w-full md:flex justify-evenly items-center gap-3">
        {/* search */}

        <Input
          type="text"
          placeholder={searchBoxText}
          value={searchTerm}
          className={`${searchBox ? "" : "hidden"}`}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        {/* filter */}

        <Select
          // label="Category"
          placeholder="Category"
          className={`${categoryFilter ? "" : "hidden"}`}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categoryOptions.map((category) => (
            <SelectItem key={category.key}>{category.label}</SelectItem>
          ))}
        </Select>

        <Select
          // label="Content Type"
          placeholder="Recipe Content Type"
          value={contentType}
          className={`${contentTypeFilter ? "" : "hidden"}`}
          onChange={(e) => setContentType(e.target.value)}
        >
          {contentTypeOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>

        {/* sort */}

        <Select
          // label="Category"
          placeholder="Sort by"
          className={`${sortBox ? "" : "hidden"}`}
          onChange={(e) => setSort(e.target.value)}
        >
          {sortOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>

        {/* reset */}

        <Button
          className="bg-transparent hover:bg-red-700 text-red-700 hover:text-[rgba(255,255,255,0.88)] text-xl rounded-lg border border-red-700 hover:border-transparent"
          onClick={resetBrowser}
          isIconOnly
        >
          <BiReset />
        </Button>
      </div>

      {/*----------------- mobile view -----------------*/}
      <Button
        isIconOnly
        className="md:hidden bg-red-700 text-[rgba(255,255,255,0.88)]"
        onClick={() => setOpenSearchFilterBox(!openSearchFilterBox)}
      >
        {openSearchFilterBox ? (
          <i className="fa-solid fa-xmark" />
        ) : (
          <i className="fa-solid fa-filter" />
        )}
      </Button>

      <div
        className={`${
          openSearchFilterBox
            ? "md:hidden bg-black/10 backdrop-blur-md flex flex-col gap-2 p-2 rounded-lg mt-2 absolute z-10"
            : "hidden"
        }`}
      >
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          className={`${searchBox ? "" : "hidden"}`}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        <Select
          name="category"
          // label="Category"
          placeholder="Category"
          className={`${categoryFilter ? "" : "hidden"}`}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categoryOptions.map((category) => (
            <SelectItem key={category.key}>{category.label}</SelectItem>
          ))}
        </Select>

        <Select
          name="contentType"
          // label="Content Type"
          placeholder="Recipe Content Type"
          value={contentType}
          className={`${contentTypeFilter ? "" : "hidden"}`}
          onChange={(e) => setContentType(e.target.value)}
        >
          {contentTypeOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>

        <Select
          // label="Category"
          placeholder="Sort by"
          className={`${sortBox ? "" : "hidden"}`}
          onChange={(e) => setSort(e.target.value)}
        >
          {sortOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>

        <Button
          className="bg-red-700 text-[rgba(255,255,255,0.88)] text-lg rounded-lg"
          onClick={resetBrowser}
        >
          <BiReset />
        </Button>
      </div>
    </div>
  );
};

export default Browser;
