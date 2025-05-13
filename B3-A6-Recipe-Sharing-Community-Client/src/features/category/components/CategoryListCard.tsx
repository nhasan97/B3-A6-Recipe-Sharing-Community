import { ICategory } from "@/src/features/category/types/category.type";
import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import React from "react";

const CategoryListCard = ({ category }: { category: ICategory }) => {
  return (
    <Card className="bg-transparent border-b shadow-none rounded-none">
      <CardHeader className="flex justify-between gap-3">
        <div className="flex items-center gap-3">
          <Image
            removeWrapper
            alt="nextui logo"
            height={60}
            radius="sm"
            src={category?.image}
            width={60}
            className="object-cover object-center"
          />
          <div className="flex flex-col">
            <p className="text-md">{category?.category}</p>
          </div>
        </div>
        <Link href={`/category-wise-recipes/${category?.category}`}>
          <Button size="sm" className="group bg-transparent">
            <i className="fa-solid fa-arrow-right text-base group-hover:translate-x-2 group-hover:transition-all" />
          </Button>
        </Link>
      </CardHeader>
    </Card>
  );
};

export default CategoryListCard;
