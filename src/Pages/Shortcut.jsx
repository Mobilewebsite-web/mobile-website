import React,{ useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { MdManageAccounts, MdHistory  } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { IoMdWallet } from "react-icons/io";
import { useUser } from "../context/UserContext"
import { useNavigate, useLocation } from "react-router-dom"; // optional if you want routing

const Shortcut = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const shortcutList = [
    { name: 'Support', path: '/customer-support', icon: <BiSupport /> },
    { name: 'Account', path: '/profile', icon: <MdManageAccounts /> },
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Orders', path: '/orders', icon: <MdHistory /> },
    { name: 'Wallet', path: '/wallet', icon: <IoMdWallet /> },
  ];

    const getActiveIndex = () => {
    const currentPath = location.pathname;
    return shortcutList.findIndex(item => item.path === currentPath);
  };

  const [activeIndex, setActiveIndex] = useState(getActiveIndex());

  useEffect(() => {
    setActiveIndex(getActiveIndex());
  }, [location.pathname]);

  const handleClick = (i, path) => {
    setActiveIndex(i);
    navigate(path); // enable this if using react-router
  };

  const { isDarkMode } = useUser();


  return (
    <div className={`fixed sm:hidden bottom-0 left-0 right-0 ${ isDarkMode ? 'bg-darkBg' : 'bg-white'} shadow-md flex justify-between px-4 py-2 z-10`}>
      <div className="flex w-full">
        {shortcutList.map((item, i) => (
          <div
            key={i}
            onClick={() => handleClick(i, item.path)}
            className="flex flex-col items-center justify-center w-full"
          >
            <div className={`relative flex items-center justify-center`}>
              {i === activeIndex ? (
                <div className="absolute -top-14 w-14 h-14 rounded-full bg-blue-800 text-white flex items-center justify-center shadow-xl scale-110 transition-all duration-200">
                  {item.icon}
                </div>
              ) : (
                <div className={`text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.icon}</div>
              )}
            </div>

              <p
              className={`text-xs mt-1 ${
                i === activeIndex
                  ? "text-blue-700 font-semibold"
                  : isDarkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shortcut;
