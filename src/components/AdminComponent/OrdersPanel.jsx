import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";

const OrdersPanel = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "orders"));
        const orderList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
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
    const filtered = orders.filter(order =>
      order.id.toLowerCase().includes(term) ||
      order.userId?.toLowerCase().includes(term) ||
      order.status?.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
    setSelectedOrder(null); // close open detail if search
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">Orders</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by Order ID, User ID, or Status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div>
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {filteredOrders.map((order) => (
              <li
                key={order.id}
                className="p-3 cursor-pointer hover:bg-blue-50"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="font-semibold text-sm">
                  Order ID: <span className="text-blue-700">{order.id}</span>
                </div>
                <div className="text-sm text-gray-600">
                  User: {order.userId} | Status: {order.status}
                </div>
              </li>
            ))}
          </ul>

          {selectedOrder && (
            <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <h3 className="text-xl font-semibold mb-3">Order Details</h3>
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>User ID:</strong> {selectedOrder.userId}</p>
              <p><strong>Status:</strong> {selectedOrder.status || "N/A"}</p>
              <p><strong>Type:</strong> {selectedOrder.type || "N/A"}</p>
              <p><strong>Amount:</strong> {selectedOrder.amount || "N/A"}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod || "N/A"}</p>
              <p><strong>Created At:</strong> {selectedOrder.createdAt?.toDate().toLocaleString() || "N/A"}</p>
              {/* Add more fields as needed */}
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => setSelectedOrder(null)}
              >
                Close Details
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersPanel;
