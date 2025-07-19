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
      className={`px-4 py-6 ${
        isDarkMode
          ? "bg-gradient-to-br from-zinc-800 to-zinc-900 text-gray-200"
          : `bg-gradient-to-br from-sky-600 to-blue-700 text-${webGreenText}`
      }`}
      style={{
        background: isDarkMode
          ? undefined
          : `linear-gradient(to bottom right, ${webGreen} 0%, #0a8376 100%)`,
        color: isDarkMode ? undefined : webGreenText,
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-10">
        {/* Quick Links */}
        <div className="space-y-4 w-full">
          <h2
            className={`text-2xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-white"
            }`}
          >
            Quick Links
          </h2>
          <div className="flex gap-4">
            
            <LogIn />

            <SignUp />
          </div>
        </div>

        {/* Stay Updated */}
        <div className="space-y-4">
          <h2
            className={`text-2xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-white"
            }`}
          >
            Stay Updated With Us 📬
          </h2>
          <ul
            className={`space-y-2 text-sm md:text-base ${
              isDarkMode ? "text-zinc-400" : "text-" + webGreenText
            }`}
            style={!isDarkMode ? { color: webGreenText } : {}}
          >
            <li className="hover:text-white transition cursor-pointer">
              Developers Page
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-white transition cursor-pointer">
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
