import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../configs/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { useUser } from "../context/UserContext";

const Login = () => {
  const { isDarkMode } = useUser();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '-',
    style: 'lowerCase',
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          username: user.displayName || randomName,
          email: user.email || "",
          photoURL: user.photoURL || "",
          createdAt: serverTimestamp(),
        });
        console.log("New user created in Firestore");
      } else {
        console.log("User already exists in Firestore");
      }

      console.log("User logged in:", user);
      navigate(-1);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Failed to login: " + error.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDarkMode
          ? "bg-gradient-to-tr from-zinc-900 via-blue-900 to-purple-900"
          : "bg-gradient-to-tr from-blue-600 to-purple-700"
      }`}
    >
      <div
        className={`max-w-md w-full rounded-2xl p-8 shadow-xl ${
          isDarkMode ? "bg-zinc-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-3xl font-extrabold mb-6 text-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Welcome Back
        </h1>
        <p
          className={`text-center mb-8 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Sign in to continue to your account
        </p>

        <button
          onClick={handleGoogleLogin}
          className={`w-full flex items-center justify-center gap-3 rounded-lg border py-3 font-semibold transition ${
            isDarkMode
              ? "bg-zinc-700 border-zinc-600 text-white hover:brightness-110"
              : "bg-white border-gray-300 text-gray-800 hover:shadow-md"
          }`}
          aria-label="Sign in with Google"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="#4285f4"
              d="M533.5 278.4c0-17.6-1.5-34.5-4.4-50.9H272v96.6h146.8c-6.3 34-25 62.9-53.3 82.2v68h86.1c50.3-46.4 79.9-114.7 79.9-195.9z"
            />
            <path
              fill="#34a853"
              d="M272 544.3c72.5 0 133.3-24 177.7-65.2l-86.1-68c-23.8 16-54.4 25.3-91.6 25.3-70.4 0-130.1-47.5-151.6-111.1h-89v69.8c44.2 87.6 134.8 149.2 240.6 149.2z"
            />
            <path
              fill="#fbbc04"
              d="M120.4 324.3c-10.5-31-10.5-64.4 0-95.4v-69.8h-89c-38.6 76.8-38.6 168.8 0 245.6l89-69.8z"
            />
            <path
              fill="#ea4335"
              d="M272 107.7c38.9 0 73.9 13.4 101.4 39.7l76-76c-46-42.9-106.6-69.4-177.4-69.4-105.7 0-196.4 61.6-240.6 149.2l89 69.8c21.7-63.7 81.4-111.3 151.6-111.3z"
            />
          </svg>
          Sign in with Google
        </button>

        <p
          className={`mt-6 text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Don't have an account?{" "}
          <span
          onClick={()=>{navigate('/signup')}}
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
