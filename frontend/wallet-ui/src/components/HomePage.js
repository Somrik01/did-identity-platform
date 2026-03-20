import React from "react";

function HomePage() {
  return (
    <div className="hero">

      <h1>Decentralized Identity Platform</h1>
      <p>Secure. Verifiable. Future-ready digital identity system.</p>

      <div className="grid">

        <div className="card">
          <h3>🔐 Blockchain DID</h3>
          <p>Own your digital identity securely.</p>
        </div>

        <div className="card">
          <h3>📜 Credentials</h3>
          <p>Issue and verify academic credentials.</p>
        </div>

        <div className="card">
          <h3>🤖 AI Security</h3>
          <p>Detect anomalies using machine learning.</p>
        </div>

      </div>

    </div>
  );
}

export default HomePage;