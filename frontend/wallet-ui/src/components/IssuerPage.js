import React, { useState } from "react";
import axios from "axios";

function IssuerPage() {

  const [holder, setHolder] = useState("");
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [response, setResponse] = useState(null);

  const issueCredential = async () => {

    const res = await axios.post("http://localhost:5000/issueCredential",{
      issuer: "University",
      holder: holder,
      type: "Degree",
      data: {
        name: name,
        degree: degree
      }
    });

    setResponse(res.data);
  };

  return (

    <div className="container">

      <h2 className="mb-4">University Issuer Portal</h2>

      <div className="card p-4">

        <div className="mb-3">
          <label className="form-label">Student DID</label>
          <input
            className="form-control"
            placeholder="did:example:123"
            onChange={(e)=>setHolder(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input
            className="form-control"
            placeholder="Student Name"
            onChange={(e)=>setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Degree</label>
          <input
            className="form-control"
            placeholder="B.Tech Computer Science"
            onChange={(e)=>setDegree(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={issueCredential}
        >
          Issue Credential
        </button>

        <br/><br/>

        {response && (
          <div className="alert alert-success">
            <pre>{JSON.stringify(response,null,2)}</pre>
          </div>
        )}

      </div>

    </div>
  );
}

export default IssuerPage;