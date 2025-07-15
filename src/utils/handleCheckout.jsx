import { doc, setDoc, updateDoc, collection, serverTimestamp, increment } from "firebase/firestore";
import { db } from "../configs/firebase"; // Adjust the path if different

export const handleCheckout = async (
  userData,
  selectedProduct,
  orderId,
  setOrderId,
  generateOrderId,
  mlUsername,
  userId,
  zoneId,
  resetAll
) => {
  const balance = parseFloat(userData?.balance);
  const rupees = parseFloat(selectedProduct?.rupees);
  const newOrderId = generateOrderId();
  setOrderId(newOrderId);

  if (!balance) {
    alert("You don't have any balance");
    return;
  }

  if (balance < rupees) {
    alert("Insufficient Balance. Please recharge first");
    return;
  }
  const confirmed = window.confirm(`Confirm purchase for ${selectedProduct?.name}`);
  if (!confirmed) return;

  try {
    const userRef = doc(db, "users", userData.uid);
    await updateDoc(userRef, {
      balance: increment(-rupees),
    });

    const orderRef = doc(db, "orders", newOrderId); // Use setDoc with this doc ref
    const orderData = {
      id: newOrderId,
      userUid: userData.uid,
      username: userData.username || "",
      mlUsername: mlUsername,
      productId: selectedProduct.id,
      productName: selectedProduct.name || "",
      rupees: selectedProduct.rupees,
      timestamp: serverTimestamp(),
      status: "completed",
      userId: userId || "",
      zoneId: zoneId || "",
    };

    await setDoc(orderRef, orderData); 
    resetAll(); 
    alert("Order placed successfully!");
  } catch (error) {
    console.error("Checkout failed:", error);
    alert("Failed to place order. Please try again.");
  }
};
