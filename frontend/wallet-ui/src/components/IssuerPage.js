import React, { useState } from "react";
import axios from "axios";

function IssuerPage() {
  const [holder, setHolder] = useState("");
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [response, setResponse] = useState(null);

  const issueCredential = async () => {
    const res = await axios.post("https://did-identity-platform.onrender.com/issueCredential", {
      issuer: "University",
      holder,
      type: "Degree",
      data: { name, degree }
    });

    setResponse(res.data);
  };

  return (
    <div className="container">

      <h2>University Issuer Portal</h2>

      <div className="card">

        <label>Student DID</label>
        <input
          placeholder="did:example:123"
          onChange={(e) => setHolder(e.target.value)}
        />

        <label>Student Name</label>
        <input
          placeholder="Student Name"
          onChange={(e) => setName(e.target.value)}
        />

        <label>Degree</label>
        <input
          placeholder="B.Tech Computer Science"
          onChange={(e) => setDegree(e.target.value)}
        />

        <button onClick={issueCredential}>
          Issue Credential
        </button>

        {response && (
          <pre>{JSON.stringify(response, null, 2)}</pre>
        )}

      </div>

    </div>
  );
}

export default IssuerPage;