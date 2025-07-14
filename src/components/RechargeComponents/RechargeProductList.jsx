import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../configs/firebase";
import { collection, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useUser } from "../../context/UserContext";
import UploadProductsButton from "../../utils/UploadProductsButton";
import { games } from "../../assets/files/games";
import small from "../../assets/images/logo-ml.jpg";

const RechargeProductList = ({selectedProduct, setSelectedProduct}) => {
  const { gamename } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useUser();
  const [editingProduct, setEditingProduct] = useState(null); // product object or null
  const [editForm, setEditForm] = useState({}); 
  const [groupFilter, setGroupFilter] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
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
    large:  game?.large || small,
    weekly: game?.weekly  || small,
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
      // Add other fields here as needed
    });
  };

  const closeEditModal = () => {
    setEditingProduct(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editingProduct) return;
    const editingId = String(editingProduct.id)
    const ref = doc(db, "products", gameId, gamename,editingId );
    await setDoc(ref, { ...editForm }, { merge: true });
    closeEditModal();
  };

  const deleteProduct = async (id) => {
    const editingId = String(id)
    const ref = doc(db, "products", gameId, gamename, editingId);
    await deleteDoc(ref);
    closeEditModal();
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  // Filter products by selected group (if any)
  const filteredProducts = groupFilter
    ? products.filter((p) => p.group === groupFilter)
    : products;

  return (
    <div className=" mt-10 relative">
      {isAdmin && gameId && (
        <div className="mb-10 p-4 bg-gray-50 border-1 shadow-md border-gray-100 flex flex-col w-full items-center gap-3 justify-center">
          <h1 className="text-xl font-bold">Admin TOOLS ✏️</h1>
          <p className="text-sm text-yellow-700 bg-yellow-100 px-3 py-2 rounded-md border border-yellow-300 mb-4 shadow-sm">
            Info: Double-click a product to edit
          </p>
          <div className="flex gap-2 items-center">
             <UploadProductsButton gameId={gameId} gameSlug={gamename} />
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
          >
            ➕ Add New
          </button>
          </div>
         
        </div>
      )}


      {/* Group filter buttons */}
      <div className="mb-4 flex gap-3 justify-center">
        {[1, 2, 3].map((group) => (
          <button
            key={group}
            onClick={() =>
              setGroupFilter(groupFilter === group ? null : group)
            }
            className={`px-3 py-1 rounded ${
              groupFilter === group
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {group === 1
              ? "Diamonds"
              : group === 2
              ? "1st Recharge"
              : "Weekly pass"}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              onDoubleClick={() => {if(!isAdmin) return; openEditModal(product)}}
              className={`bg-white rounded-md shadow-md p-3 gap-2 flex items-center text-center cursor-pointer ${
                selectedProduct?.id === product.id ? "ring-2 ring-blue-500" : ""
              }`}            >
              <div className="w-10 h-10 rounded-md overflow-hidden">
                <img
                  src={
                    product.group ===2 ? game?.dd || small :
                    imgGroup[product.img]}
                  alt={product.name}
                  className="w-full object-contain"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">{product.name}</p>
                <p className="text-blue-600 font-bold text-sm mt-1">
                  ₹{product.rupees} |{" "}
                  <span className="text-red-600 line-through font-bold text-xs">
                    ₹{product.falseRupees}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeEditModal} // close if clicked outside modal
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

            <label className="block mb-2">
              Name:
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="border rounded w-full p-2 mt-1"
              />
            </label>
            <label className="block mb-2">
              Diamonds:
              <input
                type="number"
                value={editForm.diamonds}
                onChange={(e) =>
                  setEditForm({ ...editForm, diamonds: Number(e.target.value) })
                }
                className="border rounded w-full p-2 mt-1"
              />
            </label>
             <label className="block mb-2">
              Price:
              <input
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: Number(e.target.value) })
                }
                className="border rounded w-full p-2 mt-1"
              />
            </label>
            <label className="block mb-2">
              Rupees:
              <input
                type="number"
                value={editForm.rupees}
                onChange={(e) =>
                  setEditForm({ ...editForm, rupees: Number(e.target.value) })
                }
                className="border rounded w-full p-2 mt-1"
              />
            </label>

            <label className="block mb-4">
              False Rupees:
              <input
                type="number"
                min={0}
                value={editForm.falseRupees}
                onChange={(e) =>
                  setEditForm({ ...editForm, falseRupees: Number(e.target.value) })
                }
                className="border rounded w-full p-2 mt-1"
              />
            </label>
          <select
        value={newProduct.group}
        onChange={(e) =>
          setEditForm({ ...editForm, group: Number(e.target.value) })
        }
        className="w-full border rounded p-2"
      >
        <option value={1}>Diamonds</option>
        <option value={2}>1st Recharge</option>
        <option value={3}>Weekly</option>
      </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => deleteProduct(editingProduct.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={closeEditModal}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
      <h2 className="text-lg font-bold text-center">Add New Product</h2>
       <input
        type="text"
        placeholder="ID"
        value={newProduct.id}
        onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        className="w-full border rounded p-2"
      />
      <input
        type="number"
        placeholder="Rupees"
        value={newProduct.rupees}
        onChange={(e) =>
          setNewProduct({ ...newProduct, rupees: Number(e.target.value) })
        }
        className="w-full border rounded p-2"
      />
      <input
        type="number"
        placeholder="False Rupees"
        value={newProduct.falseRupees}
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            falseRupees: Number(e.target.value),
          })
        }
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        placeholder="Image"
        value={newProduct.img}
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            img: e.target.value,
          })
        }
        className="w-full border rounded p-2"
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            price: Number(e.target.value),
          })
        }
        className="w-full border rounded p-2"
      />
      <select
        value={newProduct.group}
        onChange={(e) =>
          setNewProduct({ ...newProduct, group: Number(e.target.value) })
        }
        className="w-full border rounded p-2"
      >
        <option value={1}>Diamonds</option>
        <option value={2}>1st Recharge</option>
        <option value={3}>Weekly</option>
      </select>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowAddModal(false)}
          className="bg-gray-400 text-white px-4 py-1 rounded"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            const colRef = collection(db, "products", gameId, gamename);
            await setDoc(doc(colRef), newProduct);
            setShowAddModal(false);
            setNewProduct({
              name: "",
              rupees: "",
              falseRupees: "",
              group: 1,
              img: "small",
            });
          }}
          className="bg-blue-600 text-white px-4 py-1 rounded"
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
