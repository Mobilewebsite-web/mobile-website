import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/images/default-profile.jpeg";
import { IoMdLogOut, IoMdTrophy } from "react-icons/io";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import {
  MdManageAccounts,
  MdPrivacyTip,
  MdKeyboardArrowRight,
  MdHistory,
} from "react-icons/md";
import { IoMdWallet } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import {
  IoShieldCheckmarkSharp,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import clsx from "clsx";
import { useUser } from "../../context/UserContext";
import { auth } from "../../configs/firebase";
import { signOut } from "firebase/auth";
import MarqueeBox from "../../assets/files/UI/Logo";

const Navbar = ({ showNav, setShowNav }) => {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, userData, isDarkMode, setIsDarkMode } = useUser();

  const ulList = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "My Account", icon: <MdManageAccounts />, path: "/profile" },
    { name: "Help & Support", icon: <BiSupport />, path: "/customer-support" },
    { name: "Leaderboard", icon: <IoMdTrophy />, path: "/leaderboard" },
    { name: "Wallet", icon: <IoMdWallet />, path: "/wallet" },
    { name: "Orders", icon: <MdHistory />, path: "/orders" },
    { name: "Privacy & Policy", icon: <MdPrivacyTip />, path: "/privacy&policy" },
    { name: "Terms & Conditions", icon: <IoShieldCheckmarkSharp />, path: "/terms&condition" },
    { name: "Refund Policy", icon: <IoDocumentTextOutline />, path: "/refund_policy" },
    { name: "Queries", icon: <FaQuestionCircle />, path: "/queries" },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.style.overflow = showNav ? "hidden" : "";
  }, [showNav]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowNav(false);
      }
    };
    if (showNav) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNav]);

  const handleNavClick = (path) => {
    navigate(path);
    setShowNav(false);
  };

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    try {
      await signOut(auth);
      setShowNav(false);
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please try again.");
    }
  };



  return (
    <div className="fixed top-0 left-0 h-full z-10 md:mb-20">
      {/* Overlay */}
      {showNav && (
        <div
          onClick={() => setShowNav(false)}
          className="fixed inset-0 bg-black bg-opacity-30 pointer-events-none "
        />
      )}

      {/* Toggle Button (visible on all screens) */}
      <div
        className={clsx(
          "fixed w-full flex items-center justify-between top-0 left-0 px-4 py-2 shadow-md",
          "overflow-y-auto scrollbar-hide",
          isDarkMode ? "bg-transparent backdrop-blur-[5px] text-white" : "bg-webGreen text-black"
        )}
      >


      <span onClick={()=>navigate('/')} className="font-semibold font-poppins text-lg">
        <MarqueeBox />
      </span> 
     <div className="flex flex-row items-center gap-5">
    {!user && (
       <div className={`flex flex-row ${showNav && 'hidden'}  p-3 py-1 rounded-md ${isDarkMode ? "bg-black" : "bg-white cursor-pointer font-semibold text-[14px] border border-black font-manrope"}`}>
      <p>Sign in</p>
     </div>
    )}
    

            <button
        onClick={() => setShowNav(true)}
        className={clsx(
          "p-2 h-auto rounded-md border-gray-600/30 border bg-red-600 hover:bg-red-700 text-white shadow",
          showNav && "hidden"
        )}
      >

        <span className="text-lg sm:text-xl md:text-2xl">
          <GiHamburgerMenu />
        </span>
      </button>
 </div>
        </div>

      {/* Sidebar */}
      <aside
        ref={navRef}
        className={clsx(
          "fixed top-0 left-0 h-full w-[45%] overflow-hidden sm:w-60 md:w-65 lg:w-72 shadow-xl transition-transform duration-300 ease-in-out",
          isDarkMode ? "bg-transparent backdrop-blur-[24px] text-white" : "bg-transparent backdrop-blur-md  text-white",
          showNav ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button */}
        <div className="flex justify-end pr-5 py-1">
          <button
            onClick={() => setShowNav(false)}
            className="text-4xl text-gray-800 hover:text-red-500"
          >
            &times;
          </button>
        </div>

        <div className="px-5 pb-20 overflow-y-scroll scrollbar-hide h-full space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Welcome back</p>
              <h1 className="text-lg font-bold">
                {userData?.username || "No user"}
              </h1>
            </div>
            <div
              onClick={() => (user ? navigate("/profile") : navigate("/login"))}
              className="p-2 text-white rounded-xl shadow-md cursor-pointer"
            >
              <div className="size-12 flex items-center">
                <img
                  className="w-full h-full object-cover rounded-full border border-blue-500"
                  src={userData?.photoURL || defaultProfile}
                  alt="Profile"
                />
              </div>
            </div>
          </div>

          <hr className={clsx("border", isDarkMode ? "border-zinc-700" : "border-zinc-200")} />

          <ul className="space-y-2">
            {ulList.map((item, i) => (
              <li
                key={i}
                onClick={() => handleNavClick(item.path)}
                className={clsx(
                  "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors duration-400",
                  location.pathname === item.path
                    ? "bg-green-600 text-white"
                    : isDarkMode
                    ? "hover:bg-gray-500"
                    : "hover:bg-gray-800/60"
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

          <hr className={clsx("border", isDarkMode ? "border-zinc-700" : "border-zinc-200")} />

          <div className="mt-3">
            <h1 className="text-sm mb-1 text-zinc-400">Quick Links</h1>
            <ul>
              <li
                onClick={() => {
                  if (user) handleLogout();
                  else navigate("/login");
                }}
                className="p-2 rounded-xl cursor-pointer font-semibold hover:bg-gray-600"
              >
                {user ? "Logout" : "Login"}
              </li>
              <li
                onClick={() => navigate("/signup")}
                className="p-2 rounded-xl cursor-pointer font-semibold hover:bg-gray-500"
              >
                Sign up
              </li>
              {/* <li className="p-2 rounded-xl cursor-pointer flex items-center justify-between font-semibold select-none">
                <span>Dark Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-zinc-700 peer-focus:outline-none rounded-full peer-checked:bg-green-600 relative transition-colors" />
                  <div className="absolute left-1 top-1 bg-white border border-gray-300 rounded-full w-4 h-4 transition-transform peer-checked:translate-x-5" />
                </label>
              </li> */}
              {user && isAdmin && (
                <li
                  onClick={() => navigate("/admin")}
                  className="p-2 rounded-xl bg-green-700 text-white cursor-pointer font-semibold mt-2"
                >
                  Admin
                </li>
              )}
              <li
                onClick={() => window.open("https://wa.me/916009099196", "_blank")}
                className={`p-3 rounded-xl mt-2 cursor-pointer font-semibold ${
                  isDarkMode
                    ? "bg-gray-500 text-white hover:bg-zinc-700"
                    : "bg-green-100 text-black hover:bg-green-200"
                }`}
              >
                Contact Developer
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
