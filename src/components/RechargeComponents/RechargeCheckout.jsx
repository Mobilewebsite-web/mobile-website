import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { handleCheckout } from "../../utils/handleCheckout";

const RechargeCheckout = ({ selectedProduct, mlUsername, orderId, setOrderId, userId, zoneId, resetAll }) => {
  const { user, userData, isDarkMode } = useUser();
  const [leizou, setLeizou] = useState(false);
  const balance = userData?.balance || 0;

  useEffect(() => {
    setLeizou(balance > selectedProduct?.rupees);
  }, [balance, selectedProduct?.rupees]);

  const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORD-${timestamp}-${randomSuffix}`;
  };

  const cardBase = "p-6 max-w-md mx-auto mt-10 rounded shadow-md border-2 transition";
  const cardColor = isDarkMode
    ? "bg-zinc-900 text-white border-zinc-700"
    : "bg-white text-black border-gray-100";

  const lineColor = isDarkMode ? "border-zinc-700" : "border-gray-300";
  const mutedText = isDarkMode ? "text-gray-400" : "text-gray-600";

  if (!selectedProduct) {
    return (
      <div className={`${cardBase} ${cardColor} text-center`}>
        <p className={`${mutedText}`}>No product selected.</p>
      </div>
    );
  }

  if (!mlUsername) {
    return (
      <div className={`${cardBase} ${cardColor} text-center`}>
        <p className={`${mutedText}`}>Please check username.</p>
      </div>
    );
  }

  return (
    <div className={`${cardBase} ${cardColor}`}>
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>

      <div className="flex justify-between mb-2">
        <span className="font-medium">{selectedProduct?.name}</span>
        <span className="font-bold">₹{selectedProduct?.rupees}</span>
      </div>

      <div className="flex justify-between font-semibold text-lg">
        <span>Balance:</span>
        <span>₹{balance}</span>
      </div>

      <hr className={`my-4 border ${lineColor}`} />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total:</span>
        <span className={`${leizou ? "text-green-500" : "text-red-500"}`}>
          ₹{selectedProduct?.rupees}
        </span>
      </div>

      {user ? (
        <button
          onClick={() =>
            handleCheckout(
              userData,
              selectedProduct,
              orderId,
              setOrderId,
              generateOrderId,
              mlUsername,
              userId,
              zoneId,
              resetAll
            )
          }
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Buy Now
        </button>
      ) : (
        <Link
          to="/login"
          className="mt-6 block w-full text-center bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
        >
          Login to Buy
        </Link>
      )}
    </div>
  );
};

export default RechargeCheckout;
