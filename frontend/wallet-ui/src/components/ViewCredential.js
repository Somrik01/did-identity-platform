import React, { useState } from "react";
import axios from "axios";

function ViewCredential() {

  const [did,setDid] = useState("");
  const [credentials,setCredentials] = useState([]);

  const fetchCredentials = async () => {

    const res = await axios.get(
      `https://did-identity-platform.onrender.com/credentials/${did}`
    );

    setCredentials(res.data);
  };

  const revokeCredential = async (id) => {

    await axios.post(
      `https://did-identity-platform.onrender.com/revokeCredential/${id}`
    );

    alert("Credential Revoked");

    // reload credentials
    fetchCredentials();
  };

  return (

    <div>

      <h3>View My Credentials</h3>

      <input
        placeholder="Enter your DID"
        onChange={(e)=>setDid(e.target.value)}
      />

      <button onClick={fetchCredentials}>
        Load Credentials
      </button>
      

      <br/><br/>

      {credentials.map((cred)=>(
        <div
          key={cred.id}
          style={{
            border:"1px solid gray",
            padding:10,
            margin:10
          }}
        >

          <p><b>ID:</b> {cred.id}</p>
          <p><b>Issuer:</b> {cred.issuer}</p>
          <p><b>Type:</b> {cred.type}</p>
          <p><b>Status:</b> {cred.status}</p>
          <p>
          <b>Expiry:</b>{" "}
          {cred.expiryDate
           ? new Date(cred.expiryDate).toLocaleDateString()
           : "No expiry set"}
          </p>

          {cred.status === "active" && (
            <button
              onClick={()=>revokeCredential(cred.id)}
            >
              Revoke Credential
            </button>
          )}

        </div>
      ))}

    </div>

  );

}

export default ViewCredential;