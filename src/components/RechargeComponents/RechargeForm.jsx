import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/firebase";
const RechargeForm = ({userId, setUserId, zoneId, setZoneId, mlUsername, setMlUsername}) => {
 const [usernameExists, setUsernameExists] = useState(false)
 const {user} = useUser()
const handleSubmit = async (e) => {
    e.preventDefault();
    if(!userId || !zoneId) {
      alert("No userid or zoneid");
      return
    }
    try {
      const docRef = doc(db, "users", user.uid); 
      const userSnap = await getDoc(docRef);

      if (userSnap.exists()) {
        const username = userSnap.data().username || "No username";
        setMlUsername(username); // 👈 send back to parent
        setUsernameExists(true)
      } else {
        setMlUsername("User not found");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setMlUsername("Error fetching user");
    }
  };
  return (
    <div className=" mt-10">
      <form className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
        {/* User ID */}
        <div className="flex flex-col gap-1">
          <label htmlFor="userId" className="text-sm font-medium text-zinc-700">
            User ID
          </label>
          <input
            type="number"
            value={userId}
            required
            onChange={(e)=>setUserId(e.target.value)}
            id="userId"
            placeholder="Enter your User ID"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Zone ID */}
        <div className="flex flex-col gap-1">
          <label htmlFor="zoneId" className="text-sm font-medium text-zinc-700">
            Zone ID
          </label>
          <input
            type="number"
            id="zoneId"
            required
            value={zoneId}
            onChange={(e)=>setZoneId(e.target.value)}
            placeholder="Enter your Zone ID"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Check Username
        </button>
        {usernameExists && (
          <p className="border-1 border-gray-100 p-2 bg-gray-100 rounded-lg font-semibold">Username: {mlUsername}</p>
        )}
      </form>
    </div>
  );
};

export default RechargeForm;
