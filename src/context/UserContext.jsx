import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../configs/firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase auth user
  const [userData, setUserData] = useState(null); // Firestore user document
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ loading state

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
          setLoading(false); // ✅ data loaded
        });
      } else {
        setUserData(null);
        setIsAdmin(false);
        setLoading(false); // ✅ no user
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnap) unsubscribeSnap();
    };
  }, []);

  useEffect(() => {
    const local = localStorage.getItem("dark");
    if (local !== null) {
      setIsDarkMode(local === "true");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, userData, isAdmin, isDarkMode, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
