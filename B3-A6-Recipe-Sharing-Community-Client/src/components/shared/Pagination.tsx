"use client";

import React from "react";
import { useRecipeProvider } from "@/src/context/recipes.providers";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { GrPrevious, GrNext } from "react-icons/gr";

const Pagination = () => {
  const {
    loadingRecipeCount,
    recipeCount,
    currentPage,
    setCurrentPage,
    setItemsPerPage,
    itemsPerPage,
  } = useRecipeProvider();

  // -----------------------------------------------------------------------------------

  const itemsToShow = [
    { key: `${5}`, label: "5" },
    { key: `${10}`, label: "10" },
    { key: `${20}`, label: "20" },
    { key: `${50}`, label: "50" },
  ];

  // -----------------------------------------------------------------------------------

  let numberOfPages = 0;
  let pages: number[] = [];

  if (!loadingRecipeCount) {
    numberOfPages = Math.ceil(recipeCount / itemsPerPage);
    for (let i = 0; i < numberOfPages; i++) {
      pages.push(i);
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages?.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center flex-wrap sm:flex-nowrap md:pl-2 border">
      {/* page */}

      <Button
        className="bg-transparent hover:bg-red-700 text-red-700 hover:text-[rgba(255,255,255,0.88)] rounded-lg border-none"
        onClick={handlePrevPage}
      >
        <GrPrevious />
      </Button>
      {pages?.map((page) => (
        <Button
          key={page}
          className={`bg-transparent hover:bg-red-700 text-red-700 hover:text-[rgba(255,255,255,0.88)] border-none  ${
            currentPage === page ? "selectedPage" : ""
          }`}
          onClick={() => {
            setCurrentPage(page);
          }}
        >
          {page}
        </Button>
      ))}
      <Button
        className="bg-transparent hover:bg-red-700 text-red-700 hover:text-[rgba(255,255,255,0.88)] rounded-lg border-none"
        onClick={handleNextPage}
      >
        <GrNext />
      </Button>

      {/* limit */}

      <Select
        // name="category"
        //label="Category"
        placeholder="Items to show"
        className="max-w-[130px]"
        onChange={(e) => {
          setItemsPerPage(Number(e.target.value));
          setCurrentPage(0);
        }}
      >
        {itemsToShow.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default Pagination;
