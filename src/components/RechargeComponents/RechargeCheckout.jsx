import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const RechargeCheckout = ({ selectedProduct }) => {
  const { isLoggedIn } = useUser();

//   if (!selectedProduct) {
//     return (
//       <div className="p-6 max-w-md mx-auto text-center  rounded shadow-md">
//         <p className="text-gray-600">No product selected.</p>
//       </div>
//     );
//   }

  return (
    <div className="p-6 max-w-md mx-auto mt-10 shadow-md border-2 border-gray-100  rounded shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>
      <div className="flex justify-between mb-2">
        <span className="font-medium">{selectedProduct?.name}</span>
        <span className="font-bold">₹{selectedProduct?.rupees}</span>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between font-semibold text-lg">
        <span>Total:</span>
        <span>₹{selectedProduct?.rupees}</span>
      </div>

      {isLoggedIn ? (
        <button
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={() => alert("Proceed to payment (mock)")}
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
