import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DSARList from "./pages/DSARList";
import DSARDetail from "./pages/DSARDetail";

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "var(--lbg-bg, #f4f6f9)" }}>
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<DSARList />} />
            <Route path="/dsar/:id" element={<DSARDetail />} />
          </Routes>
        </main>
        {/* Footer */}
        <footer className="app-footer text-center">
          <div className="container">
            <strong>Lloyds Banking Group</strong> — Automation Demo Portal
            <br />
            <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>
              © 2026 For Demonstration Purposes Only — Not for Production Use
            </span>
          </div>
        </footer>
    </div>
    </Router>
  );
}

export default App;
