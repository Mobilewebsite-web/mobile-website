import { MdHistory, MdCreditCard, MdSupport, MdAccountCircle } from "react-icons/md";
import { FaQuestionCircle, FaPlus, FaUserShield, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useState, useEffect } from "react";

const HomeUtils = () => {
  const { isDarkMode } = useUser();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

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

  // Track screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint in Tailwind
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Determine items to show
  const itemsToShow = isLargeScreen || showMore ? utilList : utilList.slice(0, 4);

  return (
    <div
      className={`
        mt-10 grid grid-cols-4 lg:grid-cols-8 gap-2 px-4 py-6 shadow-md relative
        ${isDarkMode ? "bg-transparent backdrop-blur-sm border-sky-500 shadow-sky-900 " : "bg-lightGreen text-icons"}
      `}
    >
      {itemsToShow.map((item, i) => (
        <button
          key={i}
          onClick={() => navigate(item.link)}
          className={`
            flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer transition duration-200 select-none
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            ${isDarkMode
              ? "bg-darkElementBg text-bgo hover:bg-zinc-700 focus-visible:ring-blue-500 focus-visible:ring-offset-zinc-900"
              : "bg-white hover:shadow-xl text-darkGreen  hover:border-blue-500 focus-visible:ring-green-500 focus-visible:ring-offset-[#066658]"}
          `}
        >
          <div className="text-3xl text-icons">{item.icon}</div>
          <p className="text-[9px] font-medium">{item.name}</p>
        </button>
      ))}

      {/* Show More button: only show if not on lg+ screens */}
      {!isLargeScreen && (
        <div className="col-span-4 flex justify-end mt-2">
          <button
            onClick={() => setShowMore(prev => !prev)}
            className="text-white text-xs font-bold font-manrope"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeUtils;