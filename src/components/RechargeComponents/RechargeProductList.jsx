import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase"; // your Firebase config
import { collection, onSnapshot } from "firebase/firestore";

const RechargeProductList = () => {
  const { gamename } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gamename) return;

    const colRef = collection(db, "products", gamename, gamename);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
        setLoading(false);
      },
      (error) => {
        console.error("❌ Error fetching products:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // cleanup listener
  }, [gamename]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-24 object-contain mb-2"
            />
            <p className="font-semibold text-sm">{product.name}</p>
            <p className="text-blue-600 font-bold text-sm mt-1">
              ₹{product.price}
            </p>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default RechargeProductList;
