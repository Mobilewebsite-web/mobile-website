import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../configs/firebase";
import { collection, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useUser } from "../../context/UserContext";
import UploadProductsButton from "../../utils/UploadProductsButton";
import { games } from "../../assets/files/games";
import small from "../../assets/images/logo-ml.jpg";

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
      className={`mt-10 px-4 sm:px-8 rounded-xl relative min-h-screen transition-colors duration-300
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

{/* Group Filter Tabs */}
<div className="mb-8 flex justify-start gap-3 whitespace-nowrap overflow-x-auto px-2 scroll-pl-4">
  {[1, 2, 3].map((group) => (
    <button
      key={group}
      onClick={() => setGroupFilter(groupFilter === group ? null : group)}
      className={`px-5 py-2 rounded-full font-semibold transition shadow-md flex-shrink-0
        ${
          groupFilter === group
            ? "bg-webGreen text-webGreenLight"
            : isDarkMode
            ? "bg-webGreen/90 text-webGreenLight/80"
            : "bg-webGreenLight/90 text-webGreen hover:bg-webGreen"
        }`}
    >
      {group === 1 ? "💎 Diamonds" : group === 2 ? "🔥 First Recharge" : "📦 Weekly Pack"}
    </button>
  ))}
</div>


{/* Product Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <div
        key={product.id}
        onClick={() => {
         
            setSelectedProduct(product);
        }}
        className={`cursor-pointer rounded-xl shadow-lg p-5 flex justify-between items-center transition-transform duration-200 border-2
          ${
            isDarkMode
              ? "bg-webGreen border-webGreen text-webGreenLight"
              : "bg-webGreenLight border-webGreenLight text-webGreen"
          }
          ${
            selectedProduct?.id === product.id
              ? "border-webGreenLight ring-4 ring-webGreen"
              : ""
          }
          hover:scale-[1.03] hover:shadow-2xl`}
      >
        {/* Left side: name and diamonds */}
        <div className="flex flex-col gap-1 max-w-[65%]">
          <h3 className="text-lg font-bold truncate">{product.name}</h3>
        
        </div>

        {/* Right side: price and falseRupees */}
        <div className="flex flex-col items-end gap-1 min-w-[80px]">
          <p className="text-webGreen font-semibold">₹{product.price}</p>
          {product.falseRupees && (
            <p className="line-through text-sm text-webGreen/70">₹{product.falseRupees}</p>
          )}
        </div>
      </div>
    ))
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
