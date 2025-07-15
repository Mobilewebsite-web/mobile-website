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
  const { user, isAdmin } = useUser();
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
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">🔥 Queries Board</h1>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Ask anything..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ask
        </button>
      </div>

      <ul className="space-y-3">
        {messages.map((msg) => (
          <li
            key={msg.id}
            className="border p-3 rounded-lg bg-white shadow flex flex-col"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-zinc-800 font-medium">{msg.content}</p>
                <p className="text-xs text-gray-400">{msg.email}</p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={() => handleToggleUpvote(msg)}
                  className={`flex items-center gap-1 text-sm ${
                    msg.voters.includes(user?.uid)
                      ? "text-blue-600"
                      : "text-zinc-500"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  {msg.upvotes}
                </button>

                <button
                  onClick={() => handleDelete(msg.id)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Display answer if exists */}
            {msg.answer && (
              <div className="mt-2 p-3 bg-gray-50 rounded border-l-4 border-blue-600 text-gray-700">
                <strong>Answer:</strong> {msg.answer}
              </div>
            )}

            {/* Admin answer input */}
            {isAdmin  && !msg.answer && (
              <div className="mt-3 flex flex-col gap-2">
                <textarea
                  rows={3}
                  placeholder="Write an answer..."
                  value={answerInputs[msg.id] ?? msg.answer ?? ""}
                  onChange={(e) => handleAnswerChange(msg.id, e.target.value)}
                  className="border rounded px-3 py-2 w-full resize-none"
                />
                <button
                  onClick={() => handleAnswerSave(msg.id)}
                  className="self-end bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
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
