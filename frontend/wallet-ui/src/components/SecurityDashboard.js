import React from "react";

function SecurityDashboard(){

  return(

    <div className="container">

      <h2 className="mb-4">Security Monitoring</h2>

      <div className="card p-4">

        <p>
          AI system monitors credential verification activity
          and detects anomalies in the network.
        </p>

        <hr/>

        <ul>
          <li>Verification logs stored in database</li>
          <li>Machine learning anomaly detection</li>
          <li>Suspicious credential behavior tracking</li>
        </ul>

        <div className="alert alert-warning mt-3">
          Run the AI engine in the <b>ai-engine</b> folder to analyze logs.
        </div>

      </div>

    </div>

  );
}

export default SecurityDashboard;