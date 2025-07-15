import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";
import { useUser } from "../../context/UserContext";

const UserStats = () => {
  const { userData, isDarkMode } = useUser();
  const [counts, setCounts] = useState({
    completed: 0,
    pending: 0,
    refunded: 0,
    failed: 0,
  });

  useEffect(() => {
    if (!userData?.uid) return;

    const fetchOrderCounts = async () => {
      try {
        const q = query(collection(db, "orders"), where("userUid", "==", userData.uid));
        const snapshot = await getDocs(q);

        const statusCounts = {
          completed: 0,
          pending: 0,
          refunded: 0,
          failed: 0,
        };

        snapshot.forEach((doc) => {
          const data = doc.data();
          const status = (data.status || "").toLowerCase();
          if (statusCounts.hasOwnProperty(status)) {
            statusCounts[status]++;
          }
        });

        setCounts(statusCounts);
      } catch (error) {
        console.error("Error fetching order counts:", error);
      }
    };

    fetchOrderCounts();
  }, [userData?.uid]);

  const cardBg = isDarkMode ? "bg-zinc-800 text-white shadow-zinc-700" : "bg-blue-50 text-black";
  const labelText = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <div className="grid p-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-7 mt-10">
      {[
        { label: "Completed", value: counts.completed },
        { label: "Pending", value: counts.pending },
        { label: "Refunded", value: counts.refunded },
        { label: "Failed", value: counts.failed },
      ].map((item) => (
        <div
          key={item.label}
          className={`flex flex-col items-center justify-center aspect-square rounded-xl text-xl font-semibold shadow-md transition ${cardBg}`}
        >
          <p className="text-4xl font-bold">{item.value}</p>
          <p className={`text-sm mt-3 ${labelText}`}>{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
