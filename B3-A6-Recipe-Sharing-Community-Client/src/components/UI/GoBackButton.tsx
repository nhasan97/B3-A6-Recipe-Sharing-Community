"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";

const GoBackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button onClick={handleGoBack} className="group bg-transparent" isIconOnly>
      <i className="fa-solid fa-arrow-left text-xl text-[#808080] group-hover:text-red-700" />
    </Button>
  );
};

export default GoBackButton;
