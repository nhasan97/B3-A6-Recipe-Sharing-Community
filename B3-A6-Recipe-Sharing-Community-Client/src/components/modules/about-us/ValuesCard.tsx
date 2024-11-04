import React from "react";

const ValuesCard = ({
  value,
}: {
  value: { valueName: string; valueDescription: string };
}) => {
  return (
    <div className="bg-black/10 backdrop-blur-md p-3 text-center space-y-2 shadow-lg rounded-lg">
      <span className="font-semibold text-red-700">{value.valueName}</span>
      <p className="text-sm md:text-base text-[#696969]">
        {value.valueDescription}
      </p>
    </div>
  );
};

export default ValuesCard;
