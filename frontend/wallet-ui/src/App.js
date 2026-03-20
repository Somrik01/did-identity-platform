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
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">

          <Link className="navbar-brand fw-bold" to="/">
            DID Identity Platform
          </Link>

          <div className="navbar-nav">

            <Link className="nav-link" to="/">
              Home
            </Link>

            <Link className="nav-link" to="/wallet">
              Wallet
            </Link>

            <Link className="nav-link" to="/issuer">
              Issuer
            </Link>

            <Link className="nav-link" to="/verify">
              Verifier
            </Link>

            <Link className="nav-link" to="/security">
              Security
            </Link>

          </div>

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