import { useNavigate } from "react-router-dom";
import ml from "../../assets/images/mlbb-logo.webp";
import React from "react";
import { useUser } from "../../context/UserContext";

const FloatingApps = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useUser();

  const floatingList = [
    { name: "Mobile Legends", path: "/recharge/mobile-legends", img: ml, tag: "Popular" },
    { name: "Game 2", path: "/recharge/game2", img: ml, tag: "New" },
  ];

  const handleKeyDown = (e, path) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    <div
      className={`
        relative mt-10 z-10 flex overflow-x-auto
        snap-x snap-mandatory px-4 py-4 rounded-xl shadow-md gap-x-4
        ${isDarkMode ? "bg-zinc-900 border border-zinc-700" : "bg-[#066658] border border-green-300"}
        scrollbar-hide
      `}
      role="list"
    >
      {floatingList.map((item, i) => (
        <div
          key={i}
          onClick={() => navigate(item.path)}
          onKeyDown={(e) => handleKeyDown(e, item.path)}
          role="button"
          tabIndex={0}
          aria-label={`Open ${item.name}`}
          className={`
            snap-center cursor-pointer rounded-xl shadow-lg h-44
            w-[calc(100%/3-1rem)] sm:w-[calc(100%/4-1rem)] lg:w-[calc(100%/8-1rem)]
            bg-center bg-cover bg-no-repeat transition-transform duration-300
            hover:scale-105 focus:scale-105 focus:outline-none relative
            ${isDarkMode ? "border border-zinc-700" : "border border-white"}
          `}
          style={{ backgroundImage: `url(${item.img})` }}
          title={item.name}
        >
          <div
            className={`
              absolute bottom-0 left-0 right-0 rounded-b-xl p-2 z-10
              ${isDarkMode ? "bg-black bg-opacity-50" : "bg-green-800 bg-opacity-60"}
            `}
          >
            <p className="text-white font-semibold text-sm truncate">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingApps;
