import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../configs/firebase";
import { collection, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useUser } from "../../context/UserContext";
import UploadProductsButton from "../../utils/UploadProductsButton";
import { games } from "../../assets/files/games";
import small from "../../assets/images/logo-ml.jpg";
import diamond from '../../assets/images/diamond.webp'
import weekly from '../../assets/images/weekly.webp'
import dd from '../../assets/images/dd.webp'

const RechargeProductList = ({ selectedProduct, setSelectedProduct }) => {
  const { gamename } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, isDarkMode } = useUser();
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [groupFilter, setGroupFilter] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    rupees: "",
    falseRupees: "",
    group: 1,
    img: "small",
    price: "",
  });

  const game = games.find((g) => g.slug === gamename);
  const gameId = String(game?.id);

  const imgGroup = {
    small: game?.small || small,
    medium: game?.medium || small,
    large: game?.large || small,
    weekly: game?.weekly || small,
  };

  useEffect(() => {
    if (!gamename || !gameId) return;

    const colRef = collection(db, "products", gameId, gamename);

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

    return () => unsubscribe();
  }, [gamename, gameId]);

  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      diamonds: product.diamonds,
      rupees: product.rupees,
      falseRupees: product.falseRupees,
      price: product.price,
      group: product.group,
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditingProduct(null);
    setEditForm({});
    setShowEditModal(false);
  };

  const saveEdit = async () => {
    if (!editingProduct) return;
    const editingId = String(editingProduct.id);
    const ref = doc(db, "products", gameId, gamename, editingId);
    await setDoc(ref, { ...editForm }, { merge: true });
    closeEditModal();
  };

  const deleteProduct = async (id) => {
    const editingId = String(id);
    const ref = doc(db, "products", gameId, gamename, editingId);
    await deleteDoc(ref);
    closeEditModal();
  };

  const filteredProducts = groupFilter
    ? products.filter((p) => p.group === groupFilter)
    : products;

  return (
    <div
      className={`mt-10 px-4 py-8 sm:px-8 rounded-xl relative min-h-screen transition-colors duration-300
        ${isDarkMode ? "bg-webGreen text-webGreenLight" : "bg-webGreenLight text-webGreen"}`}
    >
      {isAdmin && gameId && (
        <div
          className={`mb-10 p-6 rounded-2xl shadow-lg border max-w-3xl mx-auto text-center flex flex-col items-center gap-4
            ${isDarkMode ? "bg-webGreen border-webGreen" : "bg-webGreenLight border-webGreenLight"}`}
        >
          <h1 className="text-2xl font-extrabold text-webGreenLight">⚔️ Admin Panel</h1>
          <p
            className={`text-sm px-3 py-1 rounded-md border shadow-sm
              ${isDarkMode
                ? "text-webGreenLight bg-webGreen border-webGreen"
                : "text-webGreen bg-webGreenLight border-webGreenLight"}`}
          >
            Double-click any product to edit it.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <UploadProductsButton gameId={gameId} gameSlug={gamename} />
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-webGreen hover:bg-webGreen/90 text-webGreenLight px-4 py-2 rounded-md shadow transition duration-150 font-semibold"
            >
              ➕ Add New Product
            </button>
          </div>
        </div>
      )}

<div className="mb-8 grid grid-cols-3 justify-center gap-4">
  {[1, 2, 3].map((group) => {
    const isSelected = groupFilter === group;
    const label =
      group === 1 ? "Diamonds Topup" : group === 2 ? "Weekly Pass" : "Bonus Diamonds";

      const imgSrc =
    group === 1 ? diamond : group === 2 ? weekly : dd;

    return (
      <div
        key={group}
        className="relative flex flex-col items-center justify-center text-center"
      >
        <button
          onClick={() => setGroupFilter(isSelected ? null : group)}
          className={`relative w-28 h-28 flex flex-col items-center justify-center px-2 py-2 rounded-xl text-sm font-medium border shadow-sm break-words text-center
            transition-colors duration-200 overflow-hidden 
            ${
              isSelected
                ? "bg-[#0089FF] text-white border-2 border-white"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
            }`}
        >
          <img
            src={imgSrc}
            alt=""
            className="w-12 h-12 object-contain mb-1"
          />

          <span className="leading-tight text-[13px]">{label}</span>
{isSelected && (
  <div className="absolute top-0 right-0 w-6 h-6 bg-webGreenLight border-l-2 border-b-2 border-green-600  rounded-bl-full flex items-center justify-center shadow-sm">
    <span className="text-green-600 text-xs font-bold leading-none">✓</span>
  </div>
)}

        </button>
      </div>
    );
  })}
</div>



{/* Product Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => {
      const isSelected = selectedProduct?.id === product.id;
      const imgSrc =
    product?.group === 1 ? diamond :product?. group === 2 ? weekly : dd;

      return (
        <div
          key={product.id}
          onClick={() => setSelectedProduct(product)}
          className={`relative cursor-pointer flex p-[2px] justify-between overflow-hidden items-center rounded-[10px] shadow-md transition
            ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
          `}
          style={
            isSelected
              ? {
                  // Trick for gradient border: use background + padding + border-radius
                  background: "linear-gradient(135deg, #ff6ec4, #7873f5, #4ade80, #facc15)",

                  borderRadius: "10px",
                }
              : {}
          }
        >
          {/* Inner content wrapper with bg and rounded so gradient shows as border */}
          <div
            className={`flex justify-between items-center rounded-lg p-4 px-6 shadow-md
              ${isDarkMode ? "bg-gray-800" : "bg-white"}
              w-full
            `}
            style={isSelected ? { borderRadius: "0.75rem", backgroundColor:"lightblue" } : {}}
          >
            {/* Left section: Diamond count + tag */}
            <div className="flex items-center gap-4">
              {/* Diamond Image */}
                <div className="relative w-12 h-12 flex items-center justify-center rounded-full overflow-visible">
                  {/* Vertical fading yellow background */}
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(250, 204, 21, 0.8), rgba(250, 204, 21, 0))",
                      filter: "blur(8px)",
                      zIndex: 0,
                    }}
                  ></div>

                  {/* Diamond image */}
                  <img src={imgSrc} alt="diamond" className="relative w-10 h-10 z-10 rounded-full" />
                </div>

              {/* Diamond info */}
              <div className="flex flex-col">
                <span className="font-semibold">{product.diamonds} Diamonds</span>
                {product.label && (
                  <span
                    className={`text-xs px-2 py-1 rounded mt-1 w-fit ${
                      product.label === "Best Seller"
                        ? "bg-yellow-400 text-white"
                        : product.label === "Popular"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {product.label}
                  </span>
                )}
              </div>
            </div>

            {/* Right section: price */}
            <div className="text-right">
              {product.falseRupees && (
                <div className="text-sm line-through text-gray-500">₹{product.falseRupees}</div>
              )}
              <div className="text-green-600 font-bold text-lg">₹{product.price}</div>

              {/* Discount tag */}
              {product.discount && (
                <div className="text-xs bg-red-500 text-white px-2 py-1 rounded mt-1 inline-block">
                  {product.discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Checkmark quarter circle top-right */}
          {isSelected && (
            <div
              className="absolute top-0 right-0 overflow-hidden"
              style={{ width: "20px", height: "20px" }}
            >
              <div
                className="bg-red-600 text-white flex items-center justify-center"
                style={{
                  width: "20px",
                  height: "20px",
                  borderBottomLeftRadius: "40px",
                }}
              >
                {/* Check icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
        </div>
      );
    })
  ) : (
    <p className="col-span-full text-center text-webGreenLight/80">No products found.</p>
  )}
</div>


      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-webGreen bg-opacity-95 flex items-center justify-center">
          <div
            className={`rounded-xl p-6 w-full max-w-md mx-auto
              ${isDarkMode ? "bg-webGreen text-webGreenLight" : "bg-webGreenLight text-webGreen"}`}
          >
            <h2 className="text-2xl font-bold mb-4 text-webGreenLight">Edit Product</h2>
            <input
              type="text"
              placeholder="Name"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full mb-3 p-3 rounded border border-webGreen bg-webGreen text-webGreenLight focus:outline-none focus:ring-2 focus:ring-webGreenLight"
            />
            <input
              type="number"
              placeholder="Diamonds"
              value={editForm.diamonds || ""}
              onChange={(e) =>
                setEditForm({ ...editForm, diamonds: Number(e.target.value) })
              }
              className="w-full mb-3 p-3 rounded border border-webGreen bg-webGreen text-webGreenLight focus:outline-none focus:ring-2 focus:ring-webGreenLight"
            />
            <input
              type="number"
              placeholder="Price"
              value={editForm.price || ""}
              onChange={(e) =>
                setEditForm({ ...editForm, price: Number(e.target.value) })
              }
              className="w-full mb-3 p-3 rounded border border-webGreen bg-webGreen text-webGreenLight focus:outline-none focus:ring-2 focus:ring-webGreenLight"
            />
            <input
              type="number"
              placeholder="Rupees"
              value={editForm.rupees || ""}
              onChange={(e) =>
                setEditForm({ ...editForm, rupees: Number(e.target.value) })
              }
              className="w-full mb-3 p-3 rounded border border-webGreen bg-webGreen text-webGreenLight focus:outline-none focus:ring-2 focus:ring-webGreenLight"
            />
            <input
              type="number"
              placeholder="False Rupees"
              value={editForm.falseRupees || ""}
              onChange={(e) =>
                setEditForm({ ...editForm, falseRupees: Number(e.target.value) })
              }
              className="w-full mb-6 p-3 rounded border border-webGreen bg-webGreen text-webGreenLight focus:outline-none focus:ring-2 focus:ring-webGreenLight"
            />
            <div className="flex justify-between gap-3">
              <button
                onClick={closeEditModal}
                className="flex-1 py-3 bg-webGreen hover:bg-webGreen/90 rounded font-semibold text-webGreenLight transition"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 py-3 bg-webGreenLight hover:bg-webGreenLight/90 rounded font-semibold text-webGreen transition"
              >
                Save
              </button>
              <button
                onClick={() => deleteProduct(editingProduct.id)}
                className="flex-1 py-3 bg-red-700 hover:bg-red-800 rounded font-semibold text-webGreenLight transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-webGreen bg-opacity-95 flex items-center justify-center">
          <div
            className={`rounded-xl p-6 w-full max-w-md mx-auto
              ${isDarkMode ? "bg-webGreen text-webGreenLight" : "bg-webGreenLight text-webGreen"}`}
          >
            <h2 className="text-2xl font-bold mb-4 text-webGreenLight">Add New Product</h2>
            <input
              type="text"
              placeholder="ID"
              value={newProduct.id}
              onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
              className="w-full mb-3 p-3 rounded border border-webGreen bg-webGreen text-webGreenLight focus:outline-none focus:ring-2 focus:ring-webGreenLight"
            />
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full mb-3 p-3 rounded border border-webGreen bg-webGreen text-webGreenLight focus:outline-none focus:ring-2 focus:ring-webGreenLight"
            />
            <input
              type="number"
              placeholder="Rupees"
              value={newProduct.rupees}
              onChange={(e) => setNewProduct({ ...newProduct, rupees: Number(e.target.value) })}
              className="w-full mb-3 p-3 rounded border border-webGreen bg-webGreen text-webGreenLight focus:outline-none focus:ring-2 focus:ring-webGreenLight"
            />
            <input
              type="number"
              placeholder="False Rupees"
              value={newProduct.falseRupees}
              onChange={(e) =>
                setNewProduct({ ...newProduct, falseRupees: Number(e.target.value) })
              }
              className="w-full mb-3 p-3 rounded border border-webGreen bg-webGreen text-webGreenLight focus:outline-none focus:ring-2 focus:ring-webGreenLight"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              className="w-full mb-6 p-3 rounded border border-webGreen bg-webGreen text-webGreenLight focus:outline-none focus:ring-2 focus:ring-webGreenLight"
            />
            <div className="flex justify-between gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 bg-webGreen hover:bg-webGreen/90 rounded font-semibold text-webGreenLight transition"
              >
                Cancel
              </button>
              <button
                disabled={!newProduct.id || !newProduct.name}
                onClick={async () => {
                  const colRef = collection(db, "products", gameId, gamename);
                  await setDoc(doc(colRef, newProduct.id), newProduct);
                  setShowAddModal(false);
                  setNewProduct({
                    id: "",
                    name: "",
                    rupees: "",
                    falseRupees: "",
                    group: 1,
                    img: "small",
                    price: "",
                  });
                }}
                className={`flex-1 py-3 rounded font-semibold text-webGreenLight transition
                  ${
                    !newProduct.id || !newProduct.name
                      ? "bg-webGreen/50 cursor-not-allowed"
                      : "bg-webGreenLight hover:bg-webGreenLight/90 text-webGreen"
                  }`}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RechargeProductList;
