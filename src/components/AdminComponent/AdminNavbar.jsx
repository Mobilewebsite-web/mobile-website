import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/images/default-profile.jpeg";
import {  IoMdTrophy } from "react-icons/io";
import { FaUsers  } from "react-icons/fa";
import { MdManageAccounts, MdWorkHistory , MdKeyboardArrowRight } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { PiHandDepositFill } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import clsx from "clsx"; // install clsx for clean conditional classes
import { useUser } from "../../context/UserContext";
import { auth } from "../../configs/firebase";
import { signOut } from "firebase/auth";
import { RiAdminFill } from "react-icons/ri";

const AdminNavbar = () => {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {user,isAdmin, userData} = useUser()

  const ulList = [
    { name: "Dashboard", icon: <RiAdminFill  />, path: "/admin" },
    { name: "Users", icon: <FaUsers  />, path: "/admin/users" },
    { name: "All Orders", icon: <MdWorkHistory  />, path: "/admin/orders" },
    { name: "All Topups", icon: <PiHandDepositFill  />, path: "/admin/topups" },
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
const handleLogout = async () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if (!confirmLogout) return; // 👈 cancel if user says no

  try {
    await signOut(auth);
    console.log("User logged out");
    setShowNav(false); // Optional: depends on your layout/UI
    // Optionally navigate("/login") or update state
  } catch (error) {
    console.error("Logout failed:", error);
    alert("Failed to logout. Please try again.");
  }
};

  return (
    <div className="flex items-center justify-between px-3 shadow-md py-4 ">
           <div className="size-12 flex items-center">
        <img
          className="w-full h-full object-cover rounded-full border border-blue-500"
          src={userData?.photoURL || defaultProfile}
          alt="Profile"
        />
      </div>
      <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {!user && (<button onClick={()=>navigate('/login')} className="bg-zinc-400 text-white p-2 py-1 rounded-[24px]">Sign in</button>)}
                    <GiHamburgerMenu onClick={() => setShowNav(true)} size={28} className="cursor-pointer" />
          </div>

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
                <p className="text-sm text-zinc-500">Admin</p>
                <h1 className="text-lg font-bold">{userData?.username || "No user"}</h1>
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
                <div>
            <hr className="border-zinc-200" />
      </div>
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
 

     
    </div>
  );
};

export default AdminNavbar;
