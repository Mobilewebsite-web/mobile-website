import React from "react";
import { useNavigate } from "react-router-dom";
import { games } from "../../assets/files/games";
import { useUser } from "../../context/UserContext";

const Products = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useUser();

  return (
    <div className={`mt-10 p-4 ${isDarkMode ? "bg-zinc-900" : "bg-white"}`}>
      <div
        className={`
          grid 
          grid-cols-3
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          xl:grid-cols-8
          gap-4
        `}
      >
        {games.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className={`
              p-1 
              rounded-md 
              flex flex-col items-center 
              shadow-md 
              cursor-pointer 
              hover:shadow-xl 
              transition-shadow duration-300
              ${isDarkMode ? "bg-zinc-800 border border-zinc-700" : "bg-sky-50 border border-gray-200"}
            `}
          >
            <div className={`rounded-xl overflow-hidden border-2 shadow w-full aspect-[1/1] ${isDarkMode ? "border-zinc-700" : "border-white"}`}>
              <img
                src={item.img}
                className="w-full h-full object-cover"
                alt={item.name}
              />
            </div>
            <p className={`text-[10px] md:text-xs lg:text-md font-semibold text-center mt-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
