import { useUser } from "../context/UserContext";

const Refund = () => {
          const {isDarkMode} = useUser()
  return (
    <div
      className={`max-w-4xl mx-auto px-4 sm:px-6 py-8 min-h-screen ${
        isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">💸 Refund Policy</h1>

      <div className="whitespace-pre-wrap leading-relaxed text-base space-y-4">
        <p>
          We do not offer refunds once the top-up or digital order is completed successfully.
        </p>
        <p>
          However, if you encounter a failed or incorrect transaction, please contact our support
          team within 24 hours with full details.
        </p>
        <p>
          Refunds will only be processed if the order has not been delivered and is eligible as per
          our terms.
        </p>
        <p>
          Thank you for understanding.
        </p>
      </div>
    </div>
  );
};

export default Refund;
