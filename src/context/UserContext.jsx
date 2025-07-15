import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../configs/firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase auth user
  const [userData, setUserData] = useState(null); // Firestore user document
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true); // ✅ loading state
 const [darkModeLoaded, setDarkModeLoaded] = useState(false);
  // 🔥 Load dark mode preference
 useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === null) {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(systemPrefersDark);
      localStorage.setItem("darkMode", systemPrefersDark);
    } else {
      setIsDarkMode(stored === "true");
    }
    setDarkModeLoaded(true);
  }, []);

  // 🔥 Keep localStorage in sync
   useEffect(() => {
    if (darkModeLoaded && isDarkMode !== null) {
      localStorage.setItem("darkMode", isDarkMode);
    }
  }, [isDarkMode, darkModeLoaded]);


  // 🔥 Firebase auth listener
  useEffect(() => {
    let unsubscribeSnap = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        unsubscribeSnap = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setIsAdmin(data.role === "admin");
          } else {
            setUserData(null);
            setIsAdmin(false);
          }
          setLoading(false);
        });
      } else {
        setUserData(null);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnap) unsubscribeSnap();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, userData, isAdmin, isDarkMode, loading, setIsDarkMode }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
