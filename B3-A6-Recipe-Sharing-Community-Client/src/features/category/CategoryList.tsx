import { ICategory } from "@/src/features/category/types/category.type";
import React from "react";
import NoData from "../../components/shared/NoData";
import CategoryListCard from "./components/CategoryListCard";

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
