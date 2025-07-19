import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Shortcut from './Pages/Shortcut';
import Recharge from './Pages/Recharge';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { useUser } from './context/UserContext';
import Profile from './Pages/Profile';
import CustomerSupport from './Pages/CustomerCare';
import Admin from './Pages/Admin';
import UsersPanel from './components/AdminComponent/UsersPanel';
import OrdersPanel from "./components/AdminComponent/OrdersPanel";
import AdminDashboard from './components/AdminComponent/AdminDashboard';
import Orders from './Pages/Orders';
import Wallet from './Pages/Wallet';
import Queries from './Pages/Queries';
import TopupPanel from './components/AdminComponent/TopupsPanel';
import Navbar from './components/HomeComponents/Navbar';
import Terms from './Pages/Terms';
import Refund from './Pages/Refund';
import Privacy from './Pages/Privacy';

const AppContent = () => {
  const location = useLocation();
  const { loading, isDarkMode } = useUser();

  // Check if path starts with /admin
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
<div
  className={`${!isAdminPage ? "px-4" : ""}
    ${isDarkMode ? "bg-zinc-950 text-white" : "bg-gradient-to-tr from-[#2d3250] to-[#424769] text-white"
  } min-h-[100vh]`}
>

      {/* Show Navbar only if not admin */}
      {!isAdminPage && (
        <div className="block bg-black fixed z-40 top-0 bottom-0 left-0">
          <Navbar />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersPanel />} />
          <Route path="orders" element={<OrdersPanel />} />
          <Route path="topups" element={<TopupPanel />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/customer-support" element={<CustomerSupport />} />
        <Route path="/recharge/:gamename" element={<Recharge />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/queries" element={<Queries />} />
        <Route path="/terms&condition" element={<Terms />} />
        <Route path="/refund_policy" element={<Refund />} />
        <Route path="/privacy&policy" element={<Privacy />} />
      </Routes>

      <div className="relative h-12">
        <Shortcut />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
