import React from "react";
import CustomSpinner from "./CustomSpinner";

const LoadingPage = () => {
  return (
    <div className="bg-white/10 h-screen fixed inset-0 z-50 backdrop-blur-md flex justify-center items-center">
      <CustomSpinner />
    </div>
  );
};

export default LoadingPage;
