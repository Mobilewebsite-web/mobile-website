import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdManageAccounts, MdPrivacyTip, MdArchitecture } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { useNavigate } from "react-router-dom"; // optional if you want routing

const Shortcut = () => {
  const [activeIndex, setActiveIndex] = useState(2); // default: "Home"
  const navigate = useNavigate()

  const shortcutList = [
    { name: 'Support', path: '/contact', icon: <BiSupport /> },
    { name: 'Account', path: '/profile', icon: <MdManageAccounts /> },
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Reports', path: '/orders', icon: <MdPrivacyTip /> },
    { name: 'Contact Dev', path: '/dev-contact', icon: <MdArchitecture /> },
  ];

  const handleClick = (i, path) => {
    setActiveIndex(i);
    navigate(path); // enable this if using react-router
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-between px-4 py-2 z-50">
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
              <div className="text-2xl text-black">{item.icon}</div>
            )}
          </div>
          <p
            className={`text-xs mt-1 ${
              i === activeIndex ? "text-blue-700 font-semibold" : "text-gray-600"
            }`}
          >
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Shortcut;
