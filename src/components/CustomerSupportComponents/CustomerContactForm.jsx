import { useRef } from "react";
import { useUser } from "../../context/UserContext";

const CustomerContactForm = () => {
  const { user, userData, isDarkMode } = useUser();
  const formRef = useRef(null);

  const handleSubmit = () => {
    setTimeout(() => {
      formRef.current?.reset();
    }, 100);
  };

  const inputBaseClasses =
    "w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  const inputLight =
    "border border-gray-300 bg-white text-gray-900 placeholder-gray-400";
  const inputDark =
    "border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-400";

  return (
    <div
      className={`rounded-lg p-6 shadow-md border ${
        isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-200"
      }`}
    >
      <h2
        className={`text-2xl font-semibold mb-4 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Contact Us
      </h2>

      <form
        action={import.meta.env.VITE_FORM_URL}
        method="POST"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        {/* Username */}
        <div className="mb-4">
          <label
            className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            value={userData?.username || ""}
            readOnly
            className={`${inputBaseClasses} ${
              isDarkMode ? inputDark : inputLight
            } bg-gray-100 cursor-not-allowed`}
          />
        </div>

        {/* UID */}
        <div className="mb-4">
          <label
            className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            User ID (UID)
          </label>
          <input
            type="text"
            name="uid"
            value={user?.uid || ""}
            readOnly
            className={`${inputBaseClasses} ${
              isDarkMode ? inputDark : inputLight
            } bg-gray-100 cursor-not-allowed`}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Your Email
          </label>
          <input
            type="email"
            name="email"
            required
            className={`${inputBaseClasses} ${
              isDarkMode ? inputDark : inputLight
            }`}
            placeholder="your.email@example.com"
          />
        </div>

        {/* Order ID */}
        <div className="mb-4">
          <label
            className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Order ID (if any)
          </label>
          <input
            type="text"
            name="orderId"
            placeholder="e.g., 5X94KD39... (optional)"
            className={`${inputBaseClasses} ${
              isDarkMode ? inputDark : inputLight
            }`}
          />
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label
            className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            required
            className={`${inputBaseClasses} ${
              isDarkMode ? inputDark : inputLight
            }`}
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label
            className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            required
            className={`${inputBaseClasses} ${
              isDarkMode ? inputDark : inputLight
            } resize-none`}
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
