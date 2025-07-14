import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import defaultProfile from "../../assets/images/default-profile.jpeg";
import { IoMdLogOut, IoMdTrophy } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { MdManageAccounts, MdPrivacyTip, MdKeyboardArrowRight } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { IoShieldCheckmarkSharp, IoDocumentTextOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import clsx from "clsx"; // install clsx for clean conditional classes

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const ulList = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "My Account", icon: <MdManageAccounts />, path: "/profile" },
    { name: "Help & Support", icon: <BiSupport />, path: "/help&support" },
    { name: "Leaderboard", icon: <IoMdTrophy />, path: "/leaderboard" },
    { name: "Privacy & Policy", icon: <MdPrivacyTip />, path: "/privacy&policy" },
    { name: "Terms & Conditions", icon: <IoShieldCheckmarkSharp />, path: "/terms&condition" },
    { name: "Refund Policy", icon: <IoDocumentTextOutline />, path: "/refund_policy" },
  ];

  // disable page scroll when sidebar is open
  useEffect(() => {
    if (showNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showNav]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowNav(false);
      }
    };
    if (showNav) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNav]);

  const handleNavClick = (path) => {
    navigate(path);
    setShowNav(false);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 ">
      <div className="flex items-center gap-4">
        <GiHamburgerMenu onClick={() => setShowNav(true)} size={28} className="cursor-pointer" />

        {/* Sidebar */}
        <div
          ref={navRef}
          className={clsx(
            "fixed top-0 bottom-0 left-0 z-40 w-[75%] sm:w-[300px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
            showNav ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-5 space-y-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">Welcome back</p>
                <h1 className="text-lg font-bold">Username</h1>
              </div>
              <div className="p-2 bg-red-500 text-white rounded-xl shadow-md cursor-pointer">
                <IoMdLogOut size={22} />
              </div>
            </div>
            <hr className="border-zinc-200" />

            <ul className="space-y-2">
              {ulList.map((item, i) => (
                <li
                  key={i}
                  onClick={() => handleNavClick(item.path)}
                  className={clsx(
                    "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors duration-200",
                    location.pathname === item.path
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-zinc-100 "
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <MdKeyboardArrowRight size={20} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Overlay */}
        {showNav && (
          <div
            onClick={() => setShowNav(false)}
            className="fixed inset-0 backdrop-blur-xs bg-opacity-30 z-30"
          ></div>
        )}
      </div>

      <div className="size-12 flex items-center">
        <img
          className="w-full h-full object-cover rounded-full border border-blue-500"
          src={defaultProfile}
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default Navbar;
