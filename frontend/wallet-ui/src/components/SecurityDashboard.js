import React from "react";

function SecurityDashboard() {
  return (
    <div className="container">

      <h2>Security Monitoring</h2>

      <div className="card">

        <p>
          AI system monitors credential activity and detects anomalies.
        </p>

        <ul>
          <li>Verification logs stored</li>
          <li>Isolation Forest model</li>
          <li>Suspicious activity detection</li>
        </ul>

        <p style={{ marginTop: "15px", color: "#facc15" }}>
          Run AI engine in <b>ai-engine</b> folder.
        </p>

      </div>

    </div>
  );
}

export default SecurityDashboard;