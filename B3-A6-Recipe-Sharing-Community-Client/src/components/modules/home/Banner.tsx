import React from "react";

const Banner = () => {
  return (
    <div className="bg-red-700 p-10 rounded-lg">
      <div className="flex flex-col items-start justify-center gap-6">
        <p className="text-xl text-white">Welcom to</p>
        <h1 className="glowing-text text-7xl font-bold">Taste Tribe</h1>
        <p className="text-base text-white">
          Where Every Dish Tells a Story – Share, Discover, and Savor!
        </p>
      </div>
    </div>
  );
};

export default Banner;
