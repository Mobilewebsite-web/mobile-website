import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../configs/firebase";
import { useUser } from "../context/UserContext";
import { ThumbsUp, Trash } from "lucide-react";

const Queries = () => {
  const { user, isAdmin, isDarkMode } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [answerInputs, setAnswerInputs] = useState({}); // track answer inputs per message

  useEffect(() => {
    const q = query(collection(db, "message"), orderBy("upvotes", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(data);
    });

    return () => unsubscribe();
  }, []);

  const handlePost = async () => {
    if (!user || !newMessage.trim()) return;

    await addDoc(collection(db, "message"), {
      content: newMessage.trim(),
      uid: user.uid,
      email: user.email || null,
      createdAt: Date.now(),
      upvotes: 0,
      voters: [],
      answer: null,
    });

    setNewMessage("");
  };

  const handleToggleUpvote = async (msg) => {
    if (!user) return;

    const alreadyVoted = msg.voters.includes(user.uid);
    const ref = doc(db, "message", msg.id);

    const newVoters = alreadyVoted
      ? msg.voters.filter((id) => id !== user.uid)
      : [...msg.voters, user.uid];

    const newUpvotes = alreadyVoted ? msg.upvotes - 1 : msg.upvotes + 1;

    await updateDoc(ref, {
      upvotes: newUpvotes,
      voters: newVoters,
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this message?")) {
      await deleteDoc(doc(db, "message", id));
    }
  };

  const handleAnswerChange = (msgId, value) => {
    setAnswerInputs((prev) => ({ ...prev, [msgId]: value }));
  };

  const handleAnswerSave = async (msgId) => {
    const answerText = answerInputs[msgId]?.trim();
    if (!answerText) return alert("Answer cannot be empty");

    const ref = doc(db, "message", msgId);
    await updateDoc(ref, { answer: answerText });

    alert("Answer saved!");
  };

  return (
    <div className={`max-w-xl mx-auto p-4 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <h1 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        🔥 Queries Board
      </h1>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          className={`border px-3 py-2 rounded w-full ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
          placeholder="Ask anything..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Ask
        </button>
      </div>

      <ul className="space-y-3">
        {messages.map((msg) => (
          <li
            key={msg.id}
            className={`border p-3 rounded-lg shadow flex flex-col ${
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-zinc-800"}`}>
                  {msg.content}
                </p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>
                  {msg.email}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={() => handleToggleUpvote(msg)}
                  className={`flex items-center gap-1 text-sm ${
                    msg.voters.includes(user?.uid)
                      ? "text-blue-400"
                      : isDarkMode
                      ? "text-gray-400"
                      : "text-zinc-500"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  {msg.upvotes}
                </button>

                <button
                  onClick={() => handleDelete(msg.id)}
                  className={`text-red-500 text-sm hover:text-red-700 ${
                    isDarkMode ? "hover:text-red-400" : ""
                  }`}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Display answer if exists */}
            {msg.answer && (
              <div
                className={`mt-2 p-3 rounded border-l-4 text-gray-700 ${
                  isDarkMode
                    ? "bg-gray-700 border-blue-500 text-gray-300"
                    : "bg-gray-50 border-blue-600"
                }`}
              >
                <strong>Answer:</strong> {msg.answer}
              </div>
            )}

            {/* Admin answer input */}
            {isAdmin && !msg.answer && (
              <div className="mt-3 flex flex-col gap-2">
                <textarea
                  rows={3}
                  placeholder="Write an answer..."
                  value={answerInputs[msg.id] ?? msg.answer ?? ""}
                  onChange={(e) => handleAnswerChange(msg.id, e.target.value)}
                  className={`border rounded px-3 py-2 w-full resize-none ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
                <button
                  onClick={() => handleAnswerSave(msg.id)}
                  className="self-end bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                >
                  Save Answer
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Queries;
