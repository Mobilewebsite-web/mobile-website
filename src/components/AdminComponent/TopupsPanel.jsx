import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";
import { Copy } from "lucide-react";
import { useUser } from "../../context/UserContext";

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  alert("Copied!");
};

const TopupPanel = () => {
  const [topups, setTopups] = useState([]);
  const [filteredTopups, setFilteredTopups] = useState([]);
  const [selectedTopup, setSelectedTopup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useUser();

  useEffect(() => {
    const fetchTopups = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "topup"));
        const topupList = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
        setTopups(topupList);
        setFilteredTopups(topupList);
      } catch (error) {
        console.error("Error fetching topups:", error);
      }
      setLoading(false);
    };

    fetchTopups();
  }, []);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = topups.filter(
      (topup) =>
        topup.id.toLowerCase().includes(term) ||
        topup.userUid?.toLowerCase().includes(term) ||
        topup.status?.toLowerCase().includes(term) ||
        topup.email?.toLowerCase().includes(term)
    );
    setFilteredTopups(filtered);
    setSelectedTopup(null); // close detail on search
  };

  return (
    <div
      className={`max-w-5xl relative mx-auto p-6 rounded-xl border shadow-md ${
        isDarkMode
          ? "bg-zinc-900 border-zinc-700 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Top-up Requests</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by Order ID, User UID, Email, or Status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`flex-1 px-4 py-2 rounded-md focus:outline-none ${
            isDarkMode
              ? "bg-zinc-800 border border-zinc-600 text-white placeholder-zinc-400"
              : "bg-white border border-gray-300 text-black placeholder-gray-500"
          }`}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading top-ups...</p>
      ) : filteredTopups.length === 0 ? (
        <p className="text-center text-gray-500">No top-up requests found.</p>
      ) : (
        <div>
          <ul
            className={`divide-y max-h-96 overflow-y-auto ${
              isDarkMode
                ? "divide-zinc-700"
                : "divide-gray-200"
            }`}
          >
            {filteredTopups.map((topup) => (
              <li
                key={topup.id}
                className={`p-3 cursor-pointer hover:bg-blue-50 ${
                  isDarkMode ? "hover:bg-zinc-800" : ""
                }`}
                onClick={() => setSelectedTopup(topup)}
              >
                <div className="font-semibold text-sm">
                  Order ID:{" "}
                  <span className={isDarkMode ? "text-blue-400" : "text-blue-700"}>
                    {topup.id}
                  </span>
                </div>
                <div className={isDarkMode ? "text-zinc-400 text-sm" : "text-gray-600 text-sm"}>
                  User: {topup.username} | Status: {topup.status}
                </div>
                <p className={isDarkMode ? "text-zinc-500 text-xs" : "text-gray-400 text-xs"}>
                  {topup.timestamp?.toDate().toLocaleString() || "N/A"}
                </p>
              </li>
            ))}
          </ul>

          {selectedTopup && (
            <div
              className="fixed inset-0 z-300 flex items-center justify-center bg-black/50"
              onClick={() => setSelectedTopup(null)}
            >
              <div
                className={`m-4 p-6 text-sm w-full max-w-md rounded-2xl shadow-xl ${
                  isDarkMode
                    ? "bg-zinc-900 text-white"
                    : "bg-white text-black"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold mb-4">Top-up Details</h3>

                <div className="flex items-center gap-2 mb-2">
                  <p className="break-all">
                    <strong>Order ID:</strong>{" "}
                    <span className="text-blue-600 font-semibold">{selectedTopup.id}</span>
                  </p>
                  <button onClick={() => copyToClipboard(selectedTopup.id)}>
                    <Copy size={16} />
                  </button>
                </div>

                <div className="flex items-center text-xs gap-2 mb-2">
                  <p className="break-all">
                    <strong>User Uid:</strong>{" "}
                    <span className="text-blue-600 font-semibold">{selectedTopup.userUid}</span>
                  </p>
                  <button onClick={() => copyToClipboard(selectedTopup.userUid)}>
                    <Copy size={16} />
                  </button>
                </div>
                <p>
                  <strong>Username:</strong> {selectedTopup.username || "N/A"}
                </p>

                <p>
                  <strong>Email:</strong> {selectedTopup.email || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {selectedTopup.status}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{selectedTopup.amount}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {selectedTopup.timestamp?.toDate().toLocaleString() || "N/A"}
                </p>

                <button
                  className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={() => setSelectedTopup(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopupPanel;
