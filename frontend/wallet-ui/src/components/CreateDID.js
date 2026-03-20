import React, { useState } from "react";
import axios from "axios";

function CreateDID() {

  const [didData, setDidData] = useState(null);

  const createDID = async () => {
    const res = await axios.post("http://localhost:5000/createDID");
    setDidData(res.data);
  };

  return (
    <div>
      <h2>Create DID</h2>
      <button onClick={createDID}>Generate DID</button>

      {didData && (
        <div>
          <p><b>DID:</b> {didData.did}</p>
          <p><b>Public Key:</b> {didData.publicKey}</p>
        </div>
      )}
    </div>
  );
}

export default CreateDID;