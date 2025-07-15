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

  return (
<div
  className={`
    relative
    mt-10
    z-10  /* Ensure floating apps are below sidebar with higher z-index */
    flex
    overflow-x-auto
    snap-x snap-mandatory
    px-4
    py-4
    rounded-xl
    shadow-md
    ${isDarkMode ? "bg-zinc-900" : "bg-white"}
    scrollbar-hide
  `}
>
  {floatingList.map((item, i) => (
    <div
      key={i}
      onClick={() => navigate(item.path)}
      className={`
        grid
        relative
        snap-center
        cursor-pointer
        rounded-xl
        shadow-lg
        h-44
          w-[calc(100%/3-2px)]  /* 3 per screen on mobile */
          sm:w-[calc(100%/4-2px)] /* 4 on tablet */
          lg:w-[calc(100%/8-2px)] /* 8 on large screens */
        bg-center
        bg-cover
        bg-no-repeat
        transition-transform duration-300 hover:scale-105
        ${isDarkMode ? "border border-zinc-700" : "border border-gray-300"}
        mr-4
        /* remove invalid scrollbar-hide here, put on container */
      `}
      style={{ backgroundImage: `url(${item.img})` }}
      title={item.name}
    >
      <div
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 backdrop-blur-sm rounded-b-xl p-2"
        style={{ zIndex: 0 }} /* make sure this overlay is below floating item */
      >
        <p className="text-white font-bold text-sm truncate">{item.name}</p>
      </div>
    </div>
  ))}
</div>

  );
};

export default FloatingApps;
