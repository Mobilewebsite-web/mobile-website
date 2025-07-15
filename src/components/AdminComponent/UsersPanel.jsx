import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";

const UserPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const list = snapshot.docs.map(doc => ({
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

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-3 text-center">Users</h2>

      {/* 🔍 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by username or UID..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">No matching users found.</p>
      ) : (
        <div>
          {/* 📄 User List */}
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {filteredUsers.map(user => (
              <li
                key={user.id}
                className="flex items-center p-3 cursor-pointer hover:bg-blue-50"
                onClick={() => setSelectedUser(user)} // 📌 Replace previously selected user
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <p className="font-semibold text-lg">{user.username || "Unknown"}</p>
                  <p className="text-sm text-gray-600">
                    Balance:{" "}
                    {user.balance !== undefined ? `₹${user.balance}` : "N/A"}
                  </p>
                </div>
              </li>
              
            ))}
          </ul>
{selectedUser && (
  <div
    className="fixed inset-0 z-50 flex text-sm items-center justify-center bg-black/50"
    onClick={() => setSelectedUser(null)} // close on overlay click
  >
    <div
      className="m-4 p-6 w-full max-w-md bg-white rounded-2xl shadow-inner"
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
          <p className="text-gray-600">{selectedUser.email || "No email"}</p>
        </div>
      </div>

      <p><strong>Balance:</strong> {selectedUser.balance !== undefined ? `₹${selectedUser.balance}` : "N/A"}</p>
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
