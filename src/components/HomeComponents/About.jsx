import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Button from "../../assets/files/UI/LogIn";
import SignUp from "../../assets/files/UI/SignUp";
import LogIn from "../../assets/files/UI/LogIn";


const About = () => {
  const navigate = useNavigate();
  const { user, isDarkMode } = useUser();
  

  // Define your green shades here for reuse
  const webGreen = "#066658";
  const webGreenLight = "#0a8376"; // lighter green for hover or background
  const webGreenText = "#a3f7f1"; // light green for text on dark bg
  const webGreenDarkText = "#074d46"; // dark green for text on light bg

  return (
    <footer
      className={`px-4 py-6 my-10 mb-14 rounded-lg w-full ${
        isDarkMode
          ? "bg-gradient-to-br from-zinc-800 to-zinc-900 text-gray-200"
          : `bg-[#c9e3e3]/90 text-[${webGreenText}]`
      }`}
      style={{
        background: isDarkMode
          ? undefined
          : `linear-gradient(to bottom right,elementBg 0%, #0a8376 100%)`,
        color: isDarkMode ? undefined : webGreenText,
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        {/* Quick Links */}
        <div className="space-y-4 w-full">
          <h2
            className={`text-2xl font-bold mb-2 text-center ${
              isDarkMode ? "text-white" : "text-zinc-800"
            }`}
          >
            Quick Links
          </h2>
          <div className="flex gap-4 px-4 flex items-center justify-center">
            
            <LogIn />

            <SignUp />
          </div>
        </div>

        {/* Stay Updated */}
        <div className="space-y-4 w-full">
          <h2
            className={`text-2xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-zinc-800"
            }`}
          >
            Stay Updated With Us 📬
          </h2>
          <ul
            className={`space-y-2 text-sm flex flex-col gap-2 w-full  ${
              isDarkMode ? "text-zinc-100" : "text-zinc-900"
            }`}
          >
            <li className=" transition cursor-pointer bg-white p-3">
              Developers Page
            </li>
            <li className=" transition cursor-pointer bg-white p-3">
              Terms & Conditions
            </li>
            <li className=" transition cursor-pointer bg-white p-3">
              Privacy Policy
            </li>
            <li className=" transition cursor-pointer bg-white p-3">
              Refund Policy
            </li>
            <li
              className={`text-xs pt-2 ${
                isDarkMode ? "text-zinc-500" : "text-blue-200"
              }`}
              style={!isDarkMode ? { color: "#80cbc4" } : {}}
            >
              © {new Date().getFullYear()} All rights reserved
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default About;
