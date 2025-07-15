import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";
import { useUser } from "../../context/UserContext";

const UserStats = () => {
  const { userData } = useUser();
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
        // Query all orders for this user
        const q = query(collection(db, "orders"), where("userUid", "==", userData.uid));
        const snapshot = await getDocs(q);

        // Count orders by status
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

  return (
    <div className="grid p-4 grid-cols-2 gap-7 mt-10">
      <div className="flex shadow-md flex-col items-center justify-center aspect-square bg-blue-50 rounded-xl text-xl font-semibold shadow">
        <p className="text-4xl font-bold">{counts.completed}</p>
        <p className="text-sm mt-3">Completed</p>
      </div>
      <div className="flex shadow-md flex-col items-center justify-center aspect-square bg-blue-50 rounded-xl text-xl font-semibold shadow">
        <p className="text-4xl font-bold">{counts.pending}</p>
        <p className="text-sm mt-3">Pending</p>
      </div>
      <div className="flex shadow-md flex-col items-center justify-center aspect-square bg-blue-50 rounded-xl text-xl font-semibold shadow">
        <p className="text-4xl font-bold">{counts.refunded}</p>
        <p className="text-sm mt-3">Refunded</p>
      </div>
      <div className="flex shadow-md flex-col items-center justify-center aspect-square bg-blue-50 rounded-xl text-xl font-semibold shadow">
        <p className="text-4xl font-bold">{counts.failed}</p>
        <p className="text-sm mt-3">Failed</p>
      </div>
    </div>
  );
};

export default UserStats;
