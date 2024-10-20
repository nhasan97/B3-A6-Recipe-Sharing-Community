"use client";

import { useRecipeProvider } from "@/src/context/recipes.providers";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import React, { useState } from "react";
import { BiReset } from "react-icons/bi";

const Browser = ({
  searchBox = true,
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
    reset,
  } = useRecipeProvider();

  const [openSearchFilterBox, setOpenSearchFilterBox] = useState(false);

  // -----------------------------------------------------------------------------------
  const contentTypeOptions = [
    { key: "Open", label: "Open" },
    { key: "Exclusive", label: "Exclusive" },
  ];

  // -----------------------------------------------------------------------------------
  const categoryOptions = [
    { key: "Cakes", label: "Cakes" },
    { key: "Fast Food", label: "Fast Food" },
    { key: "Drinks", label: "Drinks" },
    { key: "Seafood", label: "Seafood" },
    { key: "Salads", label: "Salads" },
    { key: "Desserts", label: "Desserts" },
    { key: "Beverages", label: "Beverages" },
    { key: "Grilled", label: "Grilled" },
    { key: "Vegan", label: "Vegan" },
    { key: "Ice Cream", label: "Ice Cream" },
    { key: "Bakery", label: "Bakery" },
    { key: "Pasta", label: "Pasta" },
    { key: "BBQ", label: "BBQ" },
    { key: "Snacks", label: "Snacks" },
    { key: "Smoothies", label: "Smoothies" },
    { key: "Dairy", label: "Dairy" },
    { key: "Frozen Foods", label: "Frozen Foods" },
    { key: "Soups", label: "Soups" },
    { key: "Fruits", label: "Fruits" },
    { key: "Sushi", label: "Sushi" },
  ];

  // -----------------------------------------------------------------------------------
  const sortOptions = [
    { key: "title", label: "Name (A to Z)" },
    { key: "-title", label: "Name (Z to A)" },
    { key: "rating", label: "Rating (1 to 5)" },
    { key: "-rating", label: "Rating (5 to 1)" },
    { key: "-rating", label: "Rating (5 to 1)" },
    { key: "upVote", label: "Most up votes" },
    { key: "-upVote", label: "Fewer up votes" },
    { key: "downVote", label: "Most down votes" },
    { key: "-downVote", label: "Fewer down votes" },
  ];
  //add cookingTime

  // -----------------------------------------------------------------------------------

  return (
    <div>
      {/* pc view */}
      <div className="hidden w-full md:flex justify-evenly items-center gap-3">
        {/* search */}

        <Input
          type="text"
          placeholder="Search by title, ingredients, cooking time and tags"
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
          className="bg-transparent hover:bg-red-700 text-red-700 hover:text-[rgba(255,255,255,0.88)] text-lg rounded-lg border border-red-700 hover:border-transparent"
          onClick={reset}
        >
          <BiReset />
        </Button>
      </div>

      {/* mobile view */}

      <Button
        className="md:hidden"
        onClick={() => setOpenSearchFilterBox(!openSearchFilterBox)}
      >
        Search
      </Button>

      <div
        className={`${
          openSearchFilterBox
            ? "md:hidden bg-default-100 flex flex-col gap-2 absolute z-10"
            : "hidden"
        } border`}
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
          className="bg-transparent hover:bg-red-700 text-red-700 hover:text-[rgba(255,255,255,0.88)] text-lg rounded-lg border border-red-700 hover:border-transparent"
          onClick={reset}
        >
          <BiReset />
        </Button>
      </div>
    </div>
  );
};

export default Browser;
