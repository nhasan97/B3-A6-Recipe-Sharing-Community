import React from "react";
import { Spinner } from "@nextui-org/spinner";

const Loading = () => {
  return (
    <div className="bg-white/10 h-screen fixed inset-0 z-50 backdrop-blur-md flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
