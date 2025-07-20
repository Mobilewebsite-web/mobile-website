import { useUser } from "../../context/UserContext";
import { useState, useEffect } from "react";
import { db } from "../../configs/firebase";
import { doc, updateDoc } from "firebase/firestore";
import defaultProfile from "../../assets/images/default-profile.jpeg";

const UserData = () => {
  const { user, userData, isDarkMode } = useUser();

  const [quote, setQuote] = useState("Loading inspiring quote...");
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(userData?.username || "");
  const [bio, setBio] = useState(userData?.bio || "");

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setBio(userData.bio || "");
    }
  }, [userData]);

  const handleSave = () => {
    if (!user) {
      setEditMode(false);
      return;
    }
    updateDoc(doc(db, "users", user.uid), { username, bio });
    setEditMode(false);
  };

  const bgClass = isDarkMode ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-100 text-black";
  const inputBg = isDarkMode ? "bg-zinc-800 text-white placeholder-gray-400" : "bg-white text-black";
  const borderColor = isDarkMode ? "border-zinc-600" : "border-gray-300";
  const mutedText = isDarkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`max-w-xl mt-12 mx-auto  p-6 shadow-md border-2 rounded-2xl transition-colors ${bgClass}`}>
      <div className="flex items-center gap-4">
        <img
          src={userData?.photoURL || defaultProfile}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-blue-500"
        />
        <div>
          {editMode ? (
            <div className="relative w-fit">
              <input
                className={`text-xl font-semibold rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all w-full max-w-xs border ${borderColor} ${inputBg}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">✏️</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-manrope">{username || "User"}</h1>
            </div>
          )}
          <p className={`${mutedText}`}>{userData?.email || "demo@gmail.com"}</p>
        </div>
      </div>

      <div className="mt-6">
        {editMode ? (
          <textarea
            className={`w-full rounded-md p-2 focus:outline-none focus:border-blue-500 ${borderColor} border ${inputBg}`}
            rows={3}
            value={bio}
            placeholder="Enter bio"
            onChange={(e) => setBio(e.target.value)}
          />
        ) : (
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} italic`}>{bio || quote}</p>
        )}
      </div>

      <div className="text-right mt-2">
        {editMode ? (
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setEditMode(false)}
              className={`px-4 py-2 rounded-xl transition ${
                isDarkMode ? "bg-zinc-700 text-white hover:bg-zinc-600" : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 font-manrope font-semibold text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserData;
