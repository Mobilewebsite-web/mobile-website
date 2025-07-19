import { useState } from "react";
import { MdHistory, MdCreditCard, MdSupport, MdAccountCircle } from "react-icons/md";
import { FaQuestionCircle, FaPlus, FaUserShield, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const HomeUtils = () => {
  const { isDarkMode } = useUser();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const utilList = [
    { name: "Add coin", link: "/wallet", icon: <FaPlus /> },
    { name: "Payments", link: "/wallet", icon: <MdCreditCard /> },
    { name: "Orders", link: "/orders", icon: <MdHistory /> },
    { name: "Queries", link: "/queries", icon: <FaQuestionCircle /> },
    { name: "Support", link: "/support", icon: <MdSupport /> },
    { name: "Profile", link: "/profile", icon: <MdAccountCircle /> },
    { name: "Security", link: "/security", icon: <FaUserShield /> },
    { name: "Settings", link: "/settings", icon: <FaTools /> },
  ];

  return (
    <div
      className={`
        mt-10 px-4 py-6 rounded-xl shadow-md
        ${isDarkMode ? "bg-zinc-900" : "bg-[#1a8a72]"}
      `}
    >
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
        {utilList.map((item, i) => {
          const shouldShow = showAll || i < 4;
          return (
            <button
              key={i}
              onClick={() => navigate(item.link)}
              className={`
                ${shouldShow ? "flex" : "hidden"} flex-col items-center gap-2
                p-3 rounded-lg cursor-pointer transition duration-200 select-none
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                ${isDarkMode
                  ? "bg-zinc-800 text-white hover:bg-zinc-700 focus-visible:ring-blue-500 focus-visible:ring-offset-zinc-900"
                  : "bg-webGreen hover:bg-green-600/40 hover:border-blue-500 focus-visible:ring-green-500 focus-visible:ring-offset-[#066658]"}
              `}
              type="button"
            >
              <div className="text-3xl">{item.icon}</div>
              <p className="text-[9px] font-medium">{item.name}</p>
            </button>
          );
        })}
      </div>

      {/* Toggle Button */}
      <div className="flex justify-end z-160 mt-2">
        <button
          onClick={() => setShowAll(!showAll)}
          className={`text-xs font-semibold underline text-white transition hover:opacity-80`}
        >
          {showAll ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
};

export default HomeUtils;
