import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../configs/firebase";
import { useUser } from "../../context/UserContext";
import {
  CheckCircle,
  Clock,
  XCircle,
  RotateCcw,
} from "lucide-react";

const statusFilters = [
  { key: "completed", label: "Completed", icon: <CheckCircle className="w-4 h-4" /> },
  { key: "pending", label: "Pending", icon: <Clock className="w-4 h-4" /> },
  { key: "refunded", label: "Refunded", icon: <RotateCcw className="w-4 h-4" /> },
  { key: "failed", label: "Failed", icon: <XCircle className="w-4 h-4" /> },
];

const WalletHistory = () => {
  const { user } = useUser();
  const [topups, setTopups] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("completed");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const q = query(
      collection(db, "topup"),
      where("userUid", "==", user.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTopups(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching topups:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup on unmount
  }, [user]);

  const filteredTopups = topups.filter(
    (topup) => topup.status === filteredStatus
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-zinc-800">Wallet Top-up History</h1>

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

      {/* Topup Records */}
      {loading ? (
        <p className="text-center text-gray-500">Loading top-up history...</p>
      ) : filteredTopups.length === 0 ? (
        <p className="text-center text-gray-500">No records found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTopups.map((topup) => (
            <li
              key={topup.id}
              onClick={() =>
                setExpandedId(expandedId === topup.id ? null : topup.id)
              }
              className="border border-gray-100 rounded-xl p-2 px-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-zinc-800">Top-up</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {topup.timestamp?.toDate().toLocaleString() || "—"}
                  </p>
                </div>
                <div className="text-sm font-medium text-right">
                  <p
                    className={`capitalize px-2 py-1 rounded text-xs inline-block ${
                      topup.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : topup.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : topup.status === "failed"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {topup.status}
                  </p>
                  <p className="text-sm text-zinc-800 mr-1">₹{topup.amount}</p>
                </div>
              </div>

              {expandedId === topup.id && (
                <div className="mt-3 text-sm text-zinc-600 space-y-1">
                  <p className="flex items-center gap-2">
                    <strong>Order ID:</strong>
                    <span className="text-sm text-zinc-700">{topup.id}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Copied");
                        navigator.clipboard.writeText(topup.id);
                      }}
                      className="text-blue-500 text-xs hover:underline"
                      title="Copy Order ID"
                    >
                      Copy
                    </button>
                  </p>
                  <p>
                    <strong>Email:</strong> {topup.email || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong> {topup.status}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{topup.amount}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WalletHistory;
