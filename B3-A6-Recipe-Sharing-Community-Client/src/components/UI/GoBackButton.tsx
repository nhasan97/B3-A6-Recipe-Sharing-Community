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
    <Button
      onClick={handleGoBack}
      className="group bg-transparent absolute top-2 left-2 sm:top-5 md:left-10"
      isIconOnly
    >
      <i className="fa-solid fa-arrow-left text-xl text-[#808080] group-hover:text-[#5D7E5F]" />
    </Button>
  );
};

export default GoBackButton;