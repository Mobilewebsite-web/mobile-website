import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
const About = () => {
  const navigate = useNavigate()
  const {user} = useUser()
  return (
    <footer className="bg-gradient-to-br from-sky-600 to-blue-700 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Quick Links */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-2">Quick Links</h2>
          <div className="flex items-center gap-4">
            <button onClick={()=>{if(!user){navigate('/login')}else{navigate('/profile')}}} className="bg-white text-blue-700 font-semibold w-1/2 py-2 rounded-md shadow hover:bg-gray-100 transition-all">
              Login
            </button>
            <button onClick={()=>{if(!user){navigate('/signup')}else{navigate('/profile')}}} className="bg-white text-blue-700 font-semibold w-1/2 py-2 rounded-md shadow hover:bg-gray-100 transition-all">
              Register
            </button>
          </div>
        </div>

        {/* Stay Updated */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-2">Stay Updated With Us 📬</h2>
          <ul className="space-y-2 text-sm md:text-base text-blue-100">
            <li className="hover:text-white transition">Developers Page</li>
            <li className="hover:text-white transition">Terms & Conditions</li>
            <li className="hover:text-white transition">Privacy Policy</li>
            <li className="hover:text-white transition">Refund Policy</li>
            <li className="text-blue-200 text-xs pt-2">© {new Date().getFullYear()} All rights reserved</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default About;
