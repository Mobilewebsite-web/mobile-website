import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Shortcut from './Pages/Shortcut';

const App = () => {
  return (
    <div className="bg-gradient-to-br from-sky-300 via-blue-200 to-white min-h-[100vh]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <div className="relative h-20">
          <Shortcut />
        </div>
      </Router>
    </div>
  );
};

export default App;
