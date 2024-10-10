"use client";

import { Checkbox } from "@nextui-org/checkbox";
import React from "react";

const IngredientCard = ({ ingredient }: { ingredient: string }) => {
  return (
    <div>
      <Checkbox>{ingredient}</Checkbox>
    </div>
  );
};

export default IngredientCard;
