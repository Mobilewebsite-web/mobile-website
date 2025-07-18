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
    "w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition";

  // Dark mode stays the same as before
  const inputDark =
    "border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-400";

  // Light mode changed to use your custom green colors
  const inputLight =
    "border border-webGreenLight bg-webGreenLight text-webGreen placeholder-webGreen/70";

  // For readonly inputs in light mode, use slightly different bg so user sees it's disabled
  const readOnlyLight = "bg-webGreen cursor-not-allowed";

  return (
    <div
      className={`rounded-lg p-6 shadow-md border ${
        isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-webGreen  border-webGreenLight"
      }`}
    >
      <h2
        className={`text-2xl font-semibold mb-4 ${
          isDarkMode ? "text-white" : "text-webLightGreen"
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
              isDarkMode ? "text-gray-300" : "text-webLightGreen"
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
              isDarkMode ? inputDark : `${inputLight} ${readOnlyLight}`
            }`}
          />
        </div>

        {/* UID */}
        <div className="mb-4">
          <label
            className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-weLightbGreen"
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
              isDarkMode ? inputDark : `${inputLight} ${readOnlyLight}`
            }`}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-webLightGreen"
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
            } focus:ring-webGreen`}
            placeholder="your.email@example.com"
          />
        </div>

        {/* Order ID */}
        <div className="mb-4">
          <label
            className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-webLightGreen"
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
            } focus:ring-webGreen`}
          />
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label
            className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-webLightGreen"
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
            } focus:ring-webGreen`}
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label
            className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-webLightGreen"
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
            } focus:ring-webGreen resize-none`}
          />
        </div>

        <button
          type="submit"
          className="bg-webGreenLight text-webGreen px-5 py-2 rounded-md hover:bg-webGreen/90 transition font-semibold"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default CustomerContactForm;
