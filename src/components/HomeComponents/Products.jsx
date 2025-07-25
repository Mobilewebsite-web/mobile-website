import React from "react";
import { useNavigate } from "react-router-dom";
import { games } from "../../assets/files/games";
import { useUser } from "../../context/UserContext";

const Products = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useUser();

  return (
    <div className={`mt-10 mx-5 rounded-[8px] p-4 ${isDarkMode ? "bg-transparent shadow-blue-800" : "bg-darkGreen"} shadow-xl`}>
      <div
        className={`
          grid 
          grid-cols-3
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          xl:grid-cols-8
          gap-2
          lg:gap-4
          
        `}
      >
        {games.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            title={item.name}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate(item.path);
            }}
            className={`
              p-1 
              rounded-md 
              flex flex-col items-center 
              shadow-sm
              cursor-pointer 
              hover:shadow-xl 
              transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ${isDarkMode
                ? "bg-black border border-zinc-700 text-white focus-visible:ring-blue-500 focus-visible:ring-offset-zinc-900"
                : "bg-white text-gray-900 focus-visible:ring-sky-500 focus-visible:ring-offset-white"}
            `}
          >
            <div
              className={`rounded-xl overflow-hidden shadow w-full aspect-[1/1] ${
                isDarkMode ? "border-zinc-700" : "border-[#c9e3e3]"
              }`}
            >
              <img
                src={item.img}
                className="w-full h-full object-cover"
                alt={item.name}
                draggable={false}
              />
            </div>
            <p className="text-[10px] md:text-xs lg:text-md font-bold text-center font-poppins mt-2 truncate w-full">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
