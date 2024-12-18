import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Navbar/Sidebar.jsx";
import Dashboard from "./pages/Dashboard";
// import Inventory from "./pages/Inventory";

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
       
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/inventory" element={<Inventory />} /> */}
            {/* Add other routes here */}
          </Routes>
        </div>
    </Router>
  );
}

export default App;
