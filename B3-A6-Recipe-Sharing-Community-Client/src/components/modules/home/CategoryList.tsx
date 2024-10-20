import { ICategory } from "@/src/types/category.type";
import React from "react";
import NoData from "../../shared/NoData";
import CategoryListCard from "../../UI/CategoryListCard";

const CategoryList = ({ categoryData }: { categoryData: ICategory[] }) => {
  return (
    <div>
      {categoryData?.length ? (
        categoryData?.map((category: ICategory) => (
          <CategoryListCard key={category.id} category={category} />
        ))
      ) : (
        <NoData text={"No Category found"} />
      )}
    </div>
  );
};

export default CategoryList;
