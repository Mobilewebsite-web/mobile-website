import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [topupCount, setTopupCount] = useState(0);
  const [topupAmount, setTopupAmount] = useState(0);
  const [loading, setLoading] = useState(true);

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

        // Sum up total amount in topups
          let totalAmount = 0;
          topupsSnap.forEach(doc => {
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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 text-center">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-4xl font-bold text-blue-700">{userCount}</p>
            <p className="mt-1 text-gray-700 font-medium">Total Users</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-4xl font-bold text-green-700">{orderCount}</p>
            <p className="mt-1 text-gray-700 font-medium">Total Orders</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-4xl font-bold text-yellow-700">{topupCount}</p>
            <p className="mt-1 text-gray-700 font-medium">Total Top-ups</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-4xl font-bold text-purple-700">₹{topupAmount}</p>
            <p className="mt-1 text-gray-700 font-medium">Top-up Amount</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
