import React, { useState } from "react";
import axios from "axios";

function VerifierPage() {

  const [id,setId] = useState("");
  const [result,setResult] = useState(null);

  const verifyCredential = async () => {

    const res = await axios.get(
      `http://localhost:5000/verifyCredential/${id}`
    );

    setResult(res.data);
  };

  return (

    <div className="container">

      <h2 className="mb-4">Credential Verification</h2>

      <div className="card p-4">

        <div className="mb-3">

          <label className="form-label">Credential ID</label>

          <input
            className="form-control"
            placeholder="Enter Credential ID"
            onChange={(e)=>setId(e.target.value)}
          />

        </div>

        <button
          className="btn btn-success"
          onClick={verifyCredential}
        >
          Verify Credential
        </button>

        <br/><br/>

        {result && (
          <div className="alert alert-info">
            <pre>{JSON.stringify(result,null,2)}</pre>
          </div>
        )}

      </div>

    </div>

  );
}

export default VerifierPage;