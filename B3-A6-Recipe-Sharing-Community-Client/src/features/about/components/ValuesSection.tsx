import React from "react";
import values from "../../../../public/data/values.json";
import ValuesCard from "./ValuesCard";

const ValuesSection = () => {
  return (
    <div className="w-full">
      <h1 className="text-lg md:text-2xl font-semibold mb-6 text-center">
        Values
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {values.map((value) => (
          <ValuesCard key={value.valueName} value={value} />
        ))}
      </div>
    </div>
  );
};

export default ValuesSection;
