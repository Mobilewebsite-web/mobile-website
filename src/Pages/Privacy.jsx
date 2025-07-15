import { useUser } from "../context/UserContext";

const Privacy = () => {
          const { isDarkMode } = useUser()
  return (
    <div
      className={`max-w-4xl mx-auto px-4 sm:px-6 py-8 min-h-screen ${
        isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">🔒 Privacy Policy</h1>

      <div className="space-y-4 leading-relaxed text-base">
        <p>
          We respect your privacy and are committed to protecting your personal information.
        </p>

        <p>
          Any information you provide to us — including name, email, and transaction details — is
          stored securely and used solely for order fulfillment, customer support, and service
          improvement.
        </p>

        <p>
          We do not sell, trade, or share your personal data with third parties, except as required
          by law or necessary for providing our services.
        </p>

        <p>
          Our platform may use cookies and analytics to enhance user experience. You may control or
          disable these in your browser settings.
        </p>

        <p>
          By using our services, you consent to this policy. We may update it occasionally, so
          please review this page regularly.
        </p>

        <p>
          If you have any questions or concerns regarding your privacy, feel free to contact us.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
