import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../configs/firebase";
import { useUser } from "../context/UserContext";
import {
  CheckCircle,
  Clock,
  XCircle,
  RotateCcw,
} from "lucide-react"; // Icons for statuses

const statusFilters = [
  { key: "completed", label: "Completed", icon: <CheckCircle className="w-4 h-4" /> },
  { key: "pending", label: "Pending", icon: <Clock className="w-4 h-4" /> },
  { key: "refunded", label: "Refunded", icon: <RotateCcw className="w-4 h-4" /> },
  { key: "failed", label: "Failed", icon: <XCircle className="w-4 h-4" /> },
];

const Orders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("completed");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "orders"),
          where("userUid", "==", user.uid),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const filteredOrders = orders.filter(
    (order) => order.status === filteredStatus
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-zinc-800">My Orders</h1>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map(({ key, label, icon }) => (
          <button
            key={key}
            className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full border transition ${
              filteredStatus === key
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
            onClick={() => setFilteredStatus(key)}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Orders */}
      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredOrders.map((order) => (
            <li
              key={order.id}
              className="border rounded-xl p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-zinc-800">
                    {order.productName}
                  </p>
                  <p className="text-sm text-zinc-500">₹{order.rupees}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {order.timestamp?.toDate().toLocaleString() || "—"}
                  </p>
                </div>
                <div className="text-sm font-medium text-right">
                  <p
                    className={`capitalize px-2 py-1 rounded text-xs inline-block ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.status === "failed"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {order.status}
                  </p>
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === order.id ? null : order.id)
                    }
                    className="text-blue-500 text-xs underline mt-2 block"
                  >
                    {expandedId === order.id ? "Hide Details" : "View Details"}
                  </button>
                </div>
              </div>

              {expandedId === order.id && (
                <div className="mt-3 text-sm text-zinc-600 space-y-1">
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>User ID:</strong> {order.userId || "N/A"}
                  </p>
                  <p>
                    <strong>Zone ID:</strong> {order.zoneId || "N/A"}
                  </p>
                     <p>
                    <strong>IGN:</strong> {order.mlUsername || "N/A"}
                  </p>
                  {/* Add other details if needed */}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
