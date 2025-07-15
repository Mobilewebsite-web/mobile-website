import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";
import { useUser } from "../../context/UserContext";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [topupCount, setTopupCount] = useState(0);
  const [topupAmount, setTopupAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useUser();

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const ordersSnap = await getDocs(collection(db, "orders"));
        const topupsSnap = await getDocs(collection(db, "topup"));

        setUserCount(usersSnap.size);
        setOrderCount(ordersSnap.size);
        setTopupCount(topupsSnap.size);

        // Sum up total top-up amount (excluding pending)
        let totalAmount = 0;
        topupsSnap.forEach((doc) => {
          const data = doc.data();
          if (data.amount && data.status !== "pending") {
            totalAmount += data.amount;
          }
        });
        setTopupAmount(totalAmount);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div
      className={`max-w-2xl mx-auto mt-0 sm:mt-0 p-6 rounded-xl border shadow-lg transition-all ${
        isDarkMode
          ? "bg-zinc-900 text-white border-zinc-700"
          : "bg-white text-zinc-800 border-gray-200"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-400 dark:text-gray-500">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900">
            <p className="text-4xl font-bold text-blue-700 dark:text-blue-300">{userCount}</p>
            <p className="mt-1 font-medium text-gray-700 dark:text-gray-200">Total Users</p>
          </div>
          <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900">
            <p className="text-4xl font-bold text-green-700 dark:text-green-300">{orderCount}</p>
            <p className="mt-1 font-medium text-gray-700 dark:text-gray-200">Total Orders</p>
          </div>
          <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900">
            <p className="text-4xl font-bold text-yellow-700 dark:text-yellow-300">{topupCount}</p>
            <p className="mt-1 font-medium text-gray-700 dark:text-gray-200">Total Top-ups</p>
          </div>
          <div className="p-4 rounded-lg bg-purple-100 dark:bg-purple-900">
            <p className="text-4xl font-bold text-purple-700 dark:text-purple-300">₹{topupAmount}</p>
            <p className="mt-1 font-medium text-gray-700 dark:text-gray-200">Top-up Amount</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
