import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { handleTopUp } from "../../utils/handleTopUp";
import defaultProfile from "../../assets/images/default-profile.jpeg";

const WalletCard = () => {
  const { user,userData } = useUser();
  const [topupModal, setTopupModal] = useState(false);
const [selectedAmount, setSelectedAmount] = useState(null);
const [customAmount, setCustomAmount] = useState("");

  const closeModal = () => setTopupModal(false);

  return (
    <div className="max-w-sm mx-auto  bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={userData?.photoURL || defaultProfile}
          alt={userData?.username || "User"}
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
        />
        <div>
          <p className="text-lg font-bold text-gray-900">{userData?.username || "Guest"}</p>
          <p className="text-sm text-gray-500">Balance</p>
          <p className="mt-1 text-3xl font-extrabold text-blue-600">
            ₹{userData?.balance?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>
      <button
        type="button"
        disabled={!user}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        onClick={() => {
          setTopupModal(true);
          if(!user) return
          handleTopUp(); // You can remove this if you don’t want it to auto-run
        }}
      >
        Recharge Wallet
      </button>

      {topupModal && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    onClick={closeModal}
  >
    <div
      className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        aria-label="Close modal"
      >
        &times;
      </button>
      <h2 className="text-2xl font-semibold mb-4">Top Up Wallet</h2>
      <p className="text-gray-600 mb-2">Choose or enter an amount:</p>

      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          {[50, 100, 200].map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              className={`py-2 rounded-lg font-medium ${
                selectedAmount === amount
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-800"
              }`}
            >
              ₹{amount}
            </button>
          ))}
        </div>

        <div>
          <input
            type="number"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setCustomAmount(e.target.value);
              if (!isNaN(val)) setSelectedAmount(val);
            }}
            className="mt-3 w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={() => {
            if (selectedAmount && selectedAmount > 0) {
              handleTopUp(selectedAmount, user, userData);
              closeModal();
            } else {
              alert("Please select or enter a valid amount.");
            }
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg mt-4"
        >
          Proceed to Payment ₹{selectedAmount || ""}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default WalletCard;
