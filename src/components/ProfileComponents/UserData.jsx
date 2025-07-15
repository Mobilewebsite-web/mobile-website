import { useUser } from "../../context/UserContext";
import { useState, useEffect } from "react";
import { db } from "../../configs/firebase";
import { doc, updateDoc } from "firebase/firestore";
import defaultProfile from "../../assets/images/default-profile.jpeg";

const UserData = () => {
  const { user, userData } = useUser();

  const [quote, setQuote] = useState("Loading inspiring quote...");
  const [editMode, setEditMode] = useState(false);

  const [username, setUsername] = useState(userData?.username || "");
  const [bio, setBio] = useState(userData?.bio || "");



  // update local editable values when userData loads
  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setBio(userData.bio || "");
    }
  }, [userData]);

  // handle save (mocked here — plug into Firestore or Firebase update logic)
  const handleSave = () => {
   
    console.log("Save clicked:", { username, bio });
    if(!user) {
          setEditMode(false)
          return
    }
          
    updateDoc(doc(db, "users", user.uid), { username, bio })
    setEditMode(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md border-gray-100 border-2 rounded-2xl transition-colors">
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
        className="text-xl font-semibold border border-blue-400 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all w-full max-w-xs"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
        ✏️
      </span>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <h1 className="text-2xl font-bold">{username || "User"}</h1>
    </div>
  )}
          <p className="text-gray-500">{userData?.email || "demo@gmail.com"}</p>
        </div>
      </div>

      <div className="mt-6">
        {editMode ? (
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            rows={3}
            value={bio}
            placeholder="Enter bio"
            onChange={(e) => setBio(e.target.value)}
          />
        ) : (
          <p className="text-gray-700 italic">{bio || quote}</p>
        )}
      </div>

      <div className="text-right mt-2">
        {editMode ? (
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-400 transition"
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
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserData;
