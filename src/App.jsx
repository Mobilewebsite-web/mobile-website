import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Shortcut from './Pages/Shortcut';
import Recharge from './Pages/Recharge';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-[100vh]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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
