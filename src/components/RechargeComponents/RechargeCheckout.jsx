import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { handleCheckout } from "../../utils/handleCheckout";

const RechargeCheckout = ({ selectedProduct, mlUsername,orderId, setOrderId, userId, zoneId,  resetAll }) => {
  const { user, userData } = useUser();
  const [leizou, setLeizou] = useState(false)
  const balance = userData?.balance || 0

  useEffect(() => {
  if (balance > selectedProduct?.rupees) {
    setLeizou(true);
  } else {
    setLeizou(false);
  }
}, [balance, selectedProduct?.rupees]);

  const generateOrderId = () => {
    const timestamp = Date.now().toString(36); // base36 = compact timestamp
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6-char random
    return `ORD-${timestamp}-${randomSuffix}`;
  };


  if (!selectedProduct) {
    return (
      <div className="p-6 max-w-md mx-auto text-center mt-10  rounded shadow-md">
        <p className="text-gray-600">No product selected.</p>
      </div>
    );
  }
    if (!mlUsername) {
    return (
      <div className="p-6 max-w-md mx-auto text-center mt-10  rounded shadow-md">
        <p className="text-gray-600">Please check username.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-10 shadow-md border-2 border-gray-100  rounded shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>
      <div className="flex justify-between mb-2">
        <span className="font-medium">{selectedProduct?.name}</span>
        <span className="font-bold">₹{selectedProduct?.rupees}</span>
      </div>
         <div className="flex justify-between font-semibold text-lg">
        <span>Balance:</span>
        <span>₹{userData?.balance || 0}</span>
      </div>
            <hr className="my-4" />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total:</span>
        <span className={`${leizou ? "text-green-600" : "text-red-600"}`}>₹{selectedProduct?.rupees}</span>
      </div>

      {user ? (
        <button
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={()=>handleCheckout(userData, selectedProduct,orderId, setOrderId, generateOrderId, mlUsername, userId, zoneId, resetAll)}
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
