import { useLocation } from "react-router-dom";
import AdminDashboard from "../components/AdminComponent/AdminDashboard";
import AdminNavbar from "../components/AdminComponent/AdminNavbar";
import { useUser } from "../context/UserContext";
import { Outlet } from "react-router-dom";
const Admin = ()=>{
          const {isAdmin} = useUser()
          const location = useLocation()
          const path = location.pathname;
          if(!isAdmin) return "You do not have access to this page";

          return (
                    <div>
                              <AdminNavbar/>
                              <Outlet />                     
                    </div>
          )
}

export default Admin;