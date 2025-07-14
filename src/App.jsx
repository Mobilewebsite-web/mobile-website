import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Shortcut from './Pages/Shortcut';
import Recharge from './Pages/Recharge';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { useUser } from './context/UserContext';

const App = () => {
  const {loading} = useUser()

  if (loading) return (<div>Loading..</div>)
  return (
    <div className="bg-white min-h-[100vh]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recharge/:gamename" element={<Recharge />} />
        </Routes>
        <div className="relative h-12">
          <Shortcut />
        </div>

      </Router>
    </div>
  );
};

export default App;
