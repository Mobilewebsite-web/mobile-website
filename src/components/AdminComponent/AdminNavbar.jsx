import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/images/default-profile.jpeg";
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { MdWorkHistory, MdKeyboardArrowRight } from "react-icons/md";
import { PiHandDepositFill } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import clsx from "clsx";
import { useUser } from "../../context/UserContext";
import { auth } from "../../configs/firebase";
import { signOut } from "firebase/auth";

const AdminNavbar = ({ isDarkMode }) => {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, userData } = useUser();

  const ulList = [
    { name: "Dashboard", icon: <RiAdminFill />, path: "/admin" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
    { name: "All Orders", icon: <MdWorkHistory />, path: "/admin/orders" },
    { name: "All Topups", icon: <PiHandDepositFill />, path: "/admin/topups" },
    { name: "Exit Admin Mode", icon: <PiHandDepositFill />, path: "/" },
  ];

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
    } catch (err) {
      alert("Failed to logout. Try again.");
    }
  };

  return (
    <>
      {/* Top Bar: visible only on small screens */}
      <div
        className={clsx(
          "flex fixed top-0 left-0 right-0 z-3 items-center justify-between px-3 shadow-md py-4 sm:hidden",
          isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
        )}
      >
        <div className="size-12 flex items-center">
          <img
            className="w-full h-full object-cover rounded-full border border-blue-500"
            src={userData?.photoURL || defaultProfile}
            alt="Profile"
          />
        </div>

        <div className="flex items-center gap-4">
          {!user && (
            <button
              onClick={() => navigate("/login")}
              className={clsx(
                "text-white p-2 py-1 rounded-[24px]",
                isDarkMode ? "bg-zinc-700" : "bg-zinc-400"
              )}
            >
              Sign in
            </button>
          )}
          <GiHamburgerMenu
            onClick={() => setShowNav(!showNav)}
            size={28}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Sidebar Drawer: always visible on sm+ */}
      <div
        ref={navRef}
        className={clsx(
          "fixed top-0 bottom-0 left-0 z-40 shadow-xl transform transition-transform duration-300 ease-in-out",
          isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black",

          // On small screens: width 75%, translateX controlled by showNav
          "w-[75%] sm:w-72 p-6 sm:translate-x-0",

          showNav ? "translate-x-0" : "-translate-x-full",

          // On sm+ screens always visible, remove transform for sm+
          "sm:static sm:translate-x-0"
        )}
        style={{ paddingLeft: "18px", paddingRight: "18px" }} // Optional: 72px total padding left+right if you want exact 72px
      >
        <div className="space-y-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-zinc-400">Admin</p>
              <h1 className="text-lg font-bold">{userData?.username || "No user"}</h1>
            </div>
          </div>
          <hr className={isDarkMode ? "border-zinc-700" : "border-zinc-200"} />
          <ul className="space-y-2">
            {ulList.map((item, i) => (
              <li
                key={i}
                onClick={() => handleNavClick(item.path)}
                className={clsx(
                  "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors duration-200",
                  location.pathname === item.path
                    ? "bg-blue-500 text-white"
                    : isDarkMode
                    ? "hover:bg-zinc-800"
                    : "hover:bg-zinc-100"
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
          <hr className={isDarkMode ? "border-zinc-700" : "border-zinc-200"} />
          <button
            onClick={handleLogout}
            className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay only on small screens */}
      {showNav && (
        <div
          onClick={() => setShowNav(false)}
          className="fixed inset-0 backdrop-blur-sm bg-black/30 z-30 sm:hidden"
        />
      )}
    </>
  );
};

export default AdminNavbar;
