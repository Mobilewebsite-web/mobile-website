import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/firebase";

const RechargeForm = ({
  userId,
  setUserId,
  zoneId,
  setZoneId,
  mlUsername,
  setMlUsername,
}) => {
  const [usernameExists, setUsernameExists] = useState(false);
  const { user, isDarkMode } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !zoneId) {
      alert("No userid or zoneid");
      return;
    }
    try {
      const docRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(docRef);

      if (userSnap.exists()) {
        const username = userSnap.data().username || "No username";
        setMlUsername(username);
        setUsernameExists(true);
      } else {
        setMlUsername("User not found");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setMlUsername("Error fetching user");
    }
  };

  const textColor = isDarkMode ? "text-white" : "text-zinc-800";
  const borderColor = isDarkMode ? "border-zinc-700" : "border-webGreen/40";
  const inputBg = isDarkMode
    ? "bg-zinc-700 text-white border-zinc-600"
    : "bg-white text-black border-webGreen/30";
  const cardBg = isDarkMode ? "bg-zinc-800" : "bg-webGreenLight";
  const usernameBox = isDarkMode ? "bg-zinc-700 text-white" : "bg-white";

  return (
    <div className="mt-10">
      <form
        className={`flex flex-col gap-4 w-full max-w-md mx-auto p-6 rounded-2xl shadow-lg ${cardBg} border ${borderColor}`}
      >
        <h2 className="text-lg font-semibold text-center text-webGreen">Enter MLBB Info</h2>

        {/* User ID */}
        <div className="flex flex-col gap-1">
          <label htmlFor="userId" className={`text-sm font-medium ${textColor}`}>
            User ID
          </label>
          <input
            type="number"
            value={userId}
            required
            onChange={(e) => setUserId(e.target.value)}
            id="userId"
            placeholder="Enter your User ID"
            className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-webGreen ${inputBg}`}
          />
        </div>

        {/* Zone ID */}
        <div className="flex flex-col gap-1">
          <label htmlFor="zoneId" className={`text-sm font-medium ${textColor}`}>
            Zone ID
          </label>
          <input
            type="number"
            id="zoneId"
            required
            value={zoneId}
            onChange={(e) => setZoneId(e.target.value)}
            placeholder="Enter your Zone ID"
            className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-webGreen ${inputBg}`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-webGreen text-white rounded-lg hover:bg-green-700 transition duration-200"
        >
          Check Username
        </button>

        {usernameExists && (
          <p className={`border border-webGreen mt-3 p-2 rounded-lg font-medium ${usernameBox}`}>
            Username: {mlUsername}
          </p>
        )}
      </form>
    </div>
  );
};

export default RechargeForm;
