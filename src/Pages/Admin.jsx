import { useLocation } from "react-router-dom";
import AdminNavbar from "../components/AdminComponent/AdminNavbar";
import { useUser } from "../context/UserContext";
import { Outlet } from "react-router-dom";

const Admin = () => {
  const { isAdmin, isDarkMode } = useUser();
  const location = useLocation();

  if (!isAdmin) return <p className="text-center mt-10">You do not have access to this page</p>;

  return (
    <div className={isDarkMode ? "bg-zinc-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <div className="fixed top-0 left-0 bottom-0 h-full">
        <AdminNavbar isDarkMode={isDarkMode} />
          </div>
        <main className="mt-6 sm:mt-0 sm:pl-72">
          <Outlet />
        </main>
    
    </div>
  );
};

export default Admin;
