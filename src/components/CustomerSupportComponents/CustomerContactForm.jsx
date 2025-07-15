import { useRef } from "react";
import { useUser } from "../../context/UserContext";
const CustomerContactForm = () => {
  const { user, userData } = useUser();
  const formRef = useRef(null)
    const handleSubmit = () => {
    setTimeout(() => {
      formRef.current?.reset();
    }, 100); 
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>

      <form
        action={import.meta.env.VITE_FORM_URL} 
        method="POST"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={userData?.username || ""}
            readOnly
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>

        {/* UID */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">User ID (UID)</label>
          <input
            type="text"
            name="uid"
            value={user?.uid || ""}
            readOnly
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Your Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Order ID */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Order ID (if any)</label>
          <input
            type="text"
            name="orderId"
            placeholder="e.g., 5X94KD39... (optional)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            rows={4}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};


export default CustomerContactForm;