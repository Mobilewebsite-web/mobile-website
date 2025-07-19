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
  const { user, isDarkMode } = useUser();
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

    return () => unsubscribe();
  }, [user]);

  const filteredTopups = topups.filter(
    (topup) => topup.status === filteredStatus
  );

  return (
    <div
      className={` px-4 py-8 rounded-lg border-1 ${
        isDarkMode ? "bg-zinc-900 text-white" : "bg-webGreenLight text-zinc-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">
        Wallet Top-up History
      </h1>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map(({ key, label, icon }) => (
          <button
            key={key}
            className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full border transition
              ${
                filteredStatus === key
                  ? "bg-blue-600 text-white border-blue-600"
                  : isDarkMode
                  ? "bg-zinc-700 text-zinc-300 border-zinc-600 hover:bg-zinc-600 hover:text-white"
                  : "bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200"
              }
            `}
            onClick={() => setFilteredStatus(key)}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Topup Records */}
      {loading ? (
        <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-center`}>
          Loading top-up history...
        </p>
      ) : filteredTopups.length === 0 ? (
        <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-center`}>
          No records found.
        </p>
      ) : (
        <ul className="space-y-4">
          {filteredTopups.map((topup) => (
            <li
              key={topup.id}
              onClick={() =>
                setExpandedId(expandedId === topup.id ? null : topup.id)
              }
              className={`border rounded-xl p-2 px-4 shadow-sm cursor-pointer transition
                ${
                  isDarkMode
                    ? "border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
                    : "border-gray-100 bg-white hover:bg-gray-50"
                }
              `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">
                    Top-up
                  </p>
                  <p className={`${isDarkMode ? "text-gray-400" : "text-gray-400"} text-xs mt-1`}>
                    {topup.timestamp?.toDate().toLocaleString() || "—"}
                  </p>
                </div>
                <div className="text-sm font-medium text-right">
                  <p
                    className={`capitalize px-2 py-1 rounded text-xs inline-block
                      ${
                        topup.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : topup.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : topup.status === "failed"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }
                    `}
                  >
                    {topup.status}
                  </p>
                  <p className="text-sm mr-1 mt-1">
                    ₹{topup.amount}
                  </p>
                </div>
              </div>

              {expandedId === topup.id && (
                <div className={`${isDarkMode ? "text-gray-300" : "text-zinc-600"} mt-3 text-sm space-y-1`}>
                  <p className="flex items-center gap-2">
                    <strong>Order ID:</strong>
                    <span className={`${isDarkMode ? "text-gray-200" : "text-zinc-700"}`}>
                      {topup.id}
                    </span>
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
