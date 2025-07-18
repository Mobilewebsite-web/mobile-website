import { MdHistory, MdCreditCard, MdSupport, MdAccountCircle } from "react-icons/md";
import { FaQuestionCircle, FaPlus, FaUserShield, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const HomeUtils = () => {
  const { isDarkMode } = useUser();
  const navigate = useNavigate();

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
        mt-10
        grid
        grid-cols-4
        lg:grid-cols-8
        gap-2
        px-4
        rounded-xl
        shadow-md
        py-6
        ${isDarkMode ? "bg-zinc-900" : "bg-webGreen"}
      `}
    >
      {utilList.map((item, i) => (
        <div
          key={i}
          onClick={() => navigate(item.link)}
          className={`
            flex flex-col items-center gap-2 cursor-pointer
            transition-colors duration-200
            rounded-lg p-3
            ${i >= 4 ? "hidden sm:flex" : "flex"}
            ${isDarkMode ? "bg-zinc-800 hover:bg-zinc-700 text-white" : "bg-green-200 hover:bg-gray-200 text-gray-600"}
          `}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate(item.link);
            }
          }}
        >
          <div className="text-3xl">{item.icon}</div>
          <p className="text-[9px] font-medium select-none">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeUtils;
