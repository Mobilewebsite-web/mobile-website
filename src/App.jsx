import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import OrdersPanel from "./components/AdminComponent/OrdersPanel"
import AdminDashboard from './components/AdminComponent/AdminDashboard';
import Orders from './Pages/Orders';
const App = () => {
  const {loading} = useUser()

  if (loading) return (<div>Loading..</div>)
  return (
    <div className="bg-gray-100 min-h-[100vh]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UsersPanel />} /> 
            <Route path="orders" element={<OrdersPanel />} /> 
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/recharge/:gamename" element={<Recharge />} />
          <Route path="/orders" element={<Orders />} />

        </Routes>
        <div className="relative h-12">
          <Shortcut />
        </div>

      </Router>
    </div>
  );
};

export default App;
