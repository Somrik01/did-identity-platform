import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";

import HomePage from "./components/HomePage";
import WalletPage from "./components/WalletPage";
import IssuerPage from "./components/IssuerPage";
import VerifierPage from "./components/VerifierPage";
import SecurityDashboard from "./components/SecurityDashboard";

function App() {

  return (
    <Router>

      {/* Navbar */}
      <nav className="navbar">
  <div className="nav-logo">DID Identity Platform</div>

  <div className="nav-links">
    <Link to="/">Home</Link>
    <Link to="/wallet">Wallet</Link>
    <Link to="/issuer">Issuer</Link>
    <Link to="/verify">Verifier</Link>
    <Link to="/security">Security</Link>
  </div>
</nav>

      {/* Page Content */}
      <div className="container mt-5">

        <Routes>

          <Route path="/" element={<HomePage />} />

          <Route path="/wallet" element={<WalletPage />} />

          <Route path="/issuer" element={<IssuerPage />} />

          <Route path="/verify" element={<VerifierPage />} />

          <Route path="/security" element={<SecurityDashboard />} />

        </Routes>

      </div>

    </Router>
  );
}

export default App; 