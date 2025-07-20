import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { handleTopUp } from "../../utils/handleTopUp";
import defaultProfile from "../../assets/images/default-profile.jpeg";

const WalletCard = () => {
  const { user, userData, isDarkMode } = useUser(); // added isDarkMode
  const [topupModal, setTopupModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  const closeModal = () => setTopupModal(false);

  return (
    <div
      className={` rounded-2xl mt-8 mx-4 shadow-lg p-6 mb-10 border
      ${
        isDarkMode
          ? "bg-zinc-900 border-zinc-700 text-white"
          : "bg-webGreenLight border-gray-200 text-gray-900"
      }
    `}
    >
      <div className="flex items-center space-x-4">
        <img
          src={userData?.photoURL || defaultProfile}
          alt={userData?.username || "User"}
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
        />
        <div>
          <p className="text-xl font-manrope font-bold">{userData?.username || "Guest"}</p>
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600 font-semibold font-manrope"
            }`}
          >
            Balance
          </p>
          <p className="mt-0 font-poppins text-3xl font-extrabold text-blue-600">
            ₹{userData?.balance?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={!user}
        className={`mt-6 w-full font-semibold py-2 rounded-lg transition
          ${
            user
              ? isDarkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 cursor-not-allowed text-gray-800"
          }
        `}
        onClick={() => {
          if (!user) return;
          setTopupModal(true);
          // You can remove this if you don’t want it to auto-run
          handleTopUp();
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
            className={`rounded-2xl p-6 max-w-md w-full shadow-xl relative mx-4
              ${
                isDarkMode
                  ? "bg-zinc-900 text-white"
                  : "bg-white text-gray-900"
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className={`absolute top-4 right-4 text-xl font-bold hover:text-gray-700
                ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"}
              `}
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4">Top Up Wallet</h2>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-2`}>
              Choose or enter an amount:
            </p>

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                {[50, 100, 200].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`py-2 rounded-lg font-medium
                      ${
                        selectedAmount === amount
                          ? "bg-blue-600 text-white"
                          : isDarkMode
                          ? "bg-blue-700 hover:bg-blue-600 text-white"
                          : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                      }
                    `}
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
                  className={`mt-3 w-full border rounded-lg px-4 py-2
                    focus:outline-none focus:ring-2
                    ${
                      isDarkMode
                        ? "border-zinc-700 bg-zinc-800 text-white focus:ring-blue-400"
                        : "border-gray-300 bg-white text-gray-900 focus:ring-blue-400"
                    }
                  `}
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
