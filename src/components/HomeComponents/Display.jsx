import display1 from "../../assets/images/mlbb.webp";
import React from "react";
const Display = () => {
  const disList = [display1, display1, display1];

  return (
    <div className="overflow-x-auto  mt-10 shadow-md border-1 border-gray-200">
      <div className="flex snap-x snap-mandatory overflow-x-scroll scrollbar-hide space-x-4">
        {disList.map((item, i) => (
          <div key={i} className="flex-shrink-0 snap-center w-full lg:w-[40%]">
            <img
              src={item}
              alt={`slide-${i}`}
              className="w-full h-auto object-cover rounded-xl shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
