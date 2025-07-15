import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";
import { useUser } from "../../context/UserContext";

const UserPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkMode } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(list);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`max-w-4xl mx-auto p-6 rounded-xl border shadow-lg ${
        isDarkMode
          ? "bg-zinc-900 border-zinc-700 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-3 text-center">Users</h2>

      {/* 🔍 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by username or UID..."
          className={`w-full px-4 py-2 rounded-md focus:outline-none ${
            isDarkMode
              ? "bg-zinc-800 border border-zinc-600 text-white placeholder-zinc-400"
              : "bg-white border border-gray-300 text-black placeholder-gray-500"
          }`}
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">No matching users found.</p>
      ) : (
        <div>
          {/* 📄 User List */}
          <ul
            className={`divide-y max-h-96 overflow-y-auto ${
              isDarkMode ? "divide-zinc-700" : "divide-gray-200"
            }`}
          >
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className={`flex items-center p-3 cursor-pointer hover:bg-blue-50 ${
                  isDarkMode ? "hover:bg-zinc-800" : ""
                }`}
                onClick={() => setSelectedUser(user)} // 📌 Replace previously selected user
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <p className="font-semibold text-lg">{user.username || "Unknown"}</p>
                  <p className={isDarkMode ? "text-zinc-400 text-sm" : "text-gray-600 text-sm"}>
                    Balance:{" "}
                    {user.balance !== undefined ? `₹${user.balance}` : "N/A"}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {selectedUser && (
            <div
              className="fixed inset-0 z-300 flex items-center justify-center bg-black/50"
              onClick={() => setSelectedUser(null)} // close on overlay click
            >
              <div
                className={`m-4 p-6 w-full max-w-md rounded-2xl shadow-inner ${
                  isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
                }`}
                onClick={(e) => e.stopPropagation()} // prevent close on modal click
              >
                <h3 className="text-xl font-semibold mb-4">User Details</h3>
                <div className="flex items-center mb-4">
                  <img
                    src={selectedUser.photoURL || "/default-avatar.png"}
                    alt={selectedUser.username}
                    className="w-16 h-16 rounded-full object-cover mr-6"
                  />
                  <div>
                    <p className="text-2xl font-bold">{selectedUser.username}</p>
                    <p className={isDarkMode ? "text-zinc-400" : "text-gray-600"}>
                      {selectedUser.email || "No email"}
                    </p>
                  </div>
                </div>

                <p>
                  <strong>Balance:</strong>{" "}
                  {selectedUser.balance !== undefined
                    ? `₹${selectedUser.balance}`
                    : "N/A"}
                </p>
                <p><strong>Bio:</strong> {selectedUser.bio || "No bio provided."}</p>
                <p>
                  <strong>CreatedAt:</strong>{" "}
                  {selectedUser.createdAt?.toDate
                    ? selectedUser.createdAt.toDate().toLocaleString()
                    : "No created date provided."}
                </p>
                <p
                  className="cursor-pointer group"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedUser.uid);
                    alert("Copied!");
                  }}
                >
                  <strong>Uid:</strong>{" "}
                  <span
                    className="text-blue-600 group-hover:underline"
                    title="Click to copy"
                  >
                    {selectedUser.uid || "No UID"}
                  </span>
                </p>

                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={() => setSelectedUser(null)}
                >
                  Close Details
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPanel;
