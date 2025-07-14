import { doc, setDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useState } from "react";

const UploadProductsButton = ({ gameId, gameSlug }) => {
  const [uploading, setUploading] = useState(false);
  const handleFileUpload = async () => {
    if (uploading) return; // prevent double click

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        setUploading(true);
        const text = await file.text();
        const jsonData = JSON.parse(text);

        if (!Array.isArray(jsonData)) {
          throw new Error("Uploaded JSON must be an array.");
        }

        for (const item of jsonData) {
          if (!item.id) continue;
          const gameIdStr = String(gameId);
          const gameSlugStr = String(gameSlug);
          const idStr = String(item.id);
          const ref = doc(db, "products", gameIdStr, gameSlugStr, idStr);
          console.log("Uploading product with id:", idStr);
          console.log("Firestore path:", ["products", gameIdStr, gameSlugStr, idStr].join("/"));

          await setDoc(ref, item);
        }

        alert("✅ Products uploaded successfully!");
      } catch (err) {
        console.error("❌ Upload failed:", err);
        alert("Upload failed: " + err.message);
      } finally {
        setUploading(false);
      }
    };

    input.click();
  };

  return (
    <button
      className={`bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded shadow ${
        uploading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleFileUpload}
      disabled={uploading}
    >
      {uploading ? "Uploading..." : "Upload JSON"}
    </button>
  );
};

export default UploadProductsButton;
