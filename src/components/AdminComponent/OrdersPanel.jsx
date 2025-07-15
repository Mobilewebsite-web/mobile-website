import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";
import { Copy } from "lucide-react";
import { useUser } from "../../context/UserContext";

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
};

const OrdersPanel = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useUser();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "orders"));
        const orderList = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);

        setOrders(orderList);
        setFilteredOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = orders.filter(
      (order) =>
        order.id.toLowerCase().includes(term) ||
        order.userId?.toLowerCase().includes(term) ||
        order.status?.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
    setSelectedOrder(null);
  };

  const textGray = isDarkMode ? "text-zinc-400" : "text-gray-600";
  const hoverBg = isDarkMode ? "hover:bg-zinc-800" : "hover:bg-blue-50";
  const borderColor = isDarkMode ? "border-zinc-700" : "border-gray-200";
  const bgColor = isDarkMode ? "bg-zinc-900" : "bg-white";
  const inputBg = isDarkMode ? "bg-zinc-800" : "bg-white";
  const inputBorder = isDarkMode ? "border-zinc-600" : "border-gray-300";
  const inputText = isDarkMode ? "text-white" : "text-black";
  const placeholderColor = isDarkMode ? "placeholder-zinc-400" : "";
  const highlightColor = isDarkMode ? "text-blue-400" : "text-blue-700";
  const modalBg = isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black";

  return (
    <div className={`max-w-5xl mx-auto p-4 sm:p-6 rounded-xl border shadow-md relative ${bgColor} ${borderColor} ${isDarkMode ? "text-white" : "text-black"}`}>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Orders</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by Order ID, User ID, or Status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`flex-1 px-4 py-2 border-1 rounded-md focus:outline-none ${inputBg} ${inputBorder} ${inputText} ${placeholderColor}`}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className={`text-center ${textGray}`}>Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className={`text-center ${textGray}`}>No orders found.</p>
      ) : (
        <div>
          <ul className={`divide-y max-h-[400px] overflow-y-auto ${borderColor}`}>
            {filteredOrders.map((order) => (
              <li
                key={order.id}
                className={`p-3 border-1 border-gray-100 rounded-lg shadow-md cursor-pointer ${hoverBg}`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="font-semibold text-sm">
                  Order ID:{" "}
                  <span className={`${highlightColor}`}>{order.id}</span>
                </div>
                <div className={`text-sm ${textGray}`}>
                  User: {order.username} | Status: {order.status}
                </div>
                <p>
                  <strong>Date:</strong>{" "}
                  {order.timestamp?.toDate().toLocaleString() || "N/A"}
                </p>
              </li>
            ))}
          </ul>

          {selectedOrder && (
            <div className="fixed inset-0 z-300 flex items-center justify-center bg-black/50">
              <div className={`m-4 p-6 text-sm w-full max-w-md rounded-2xl shadow-xl ${modalBg}`}>
                <h3 className="text-xl font-semibold mb-4">Order Details</h3>

                <div className="flex items-center gap-2 mb-2">
                  <p className="break-all">
                    <strong>Order ID:</strong>{" "}
                    <span className={`font-semibold ${highlightColor}`}>{selectedOrder.id}</span>
                  </p>
                  <button onClick={() => copyToClipboard(selectedOrder.id)}>
                    <Copy size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <p className="break-all">
                    <strong>User UID:</strong>{" "}
                    <span className={`font-semibold ${highlightColor}`}>{selectedOrder.userUid}</span>
                  </p>
                  <button onClick={() => copyToClipboard(selectedOrder.userUid)}>
                    <Copy size={16} />
                  </button>
                </div>

                <p><strong>Username:</strong> {selectedOrder.username}</p>
                <p><strong>User ID:</strong> {selectedOrder.userId}</p>
                <p><strong>Zone ID:</strong> {selectedOrder.zoneId}</p>
                <p><strong>IGN:</strong> {selectedOrder.mlUsername}</p>
                <p><strong>Status:</strong> {selectedOrder.status || "N/A"}</p>
                <p><strong>Product:</strong> {selectedOrder.productName || "N/A"}</p>
                <p><strong>Cost:</strong> ₹{selectedOrder.rupees || "N/A"}</p>
                <p><strong>Date:</strong> {selectedOrder.timestamp?.toDate().toLocaleString() || "N/A"}</p>

                <button
                  className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={() => setSelectedOrder(null)}
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

export default OrdersPanel;
