import { db } from "../configs/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// Utility: Generate a simple custom order ID
const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `TOPUP-${timestamp}-${random}`;
};

// Pass user + userData from component
export const handleTopUp = async (selectedAmount, user, userData) => {
  if (selectedAmount < 50) {
    alert("Please enter a valid amount (minimum ₹50)");
    return;
  }

  if (!user || !userData) {
    return;
  }
  const confirmed = window.confirm("Are you sure you want to topup: "+ selectedAmount + " Rs")
  if(!confirmed) return
  try {
    const orderId = generateOrderId();
    const topupDocRef = doc(db, "topup", orderId);

    await setDoc(topupDocRef, {
      id: orderId,
      userUid: userData.uid,
      username: userData.username,
      email: userData.email || null,
      amount: selectedAmount,
      status: "pending",
      timestamp: serverTimestamp(),
    });

    alert(`Top-up request created. Order ID: ${orderId}`);
  } catch (error) {
    console.error("Top-up error:", error);
    alert("Failed to create top-up request. Please try again.");
  }
};
