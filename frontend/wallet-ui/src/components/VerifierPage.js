import React, { useState } from "react";
import axios from "axios";

function VerifierPage() {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);

  const verifyCredential = async () => {
    const res = await axios.get(
      `https://did-identity-platform.onrender.com/verifyCredential/${id}`
    );
    setResult(res.data);
  };

  return (
    <div className="container">

      <h2>Credential Verification</h2>

      <div className="card">

        <label>Credential ID</label>
        <input
          placeholder="Enter Credential ID"
          onChange={(e) => setId(e.target.value)}
        />

        <button onClick={verifyCredential}>
          Verify Credential
        </button>

        {result && (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        )}

      </div>

    </div>
  );
}

export default VerifierPage;