import React from "react";
import CustomSpinner from "./CustomSpinner";

const LoadingSection = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CustomSpinner />
    </div>
  );
};

export default LoadingSection;
