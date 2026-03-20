import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function ShareCredential() {

  const [credentialId, setCredentialId] = useState("");
  const [showQR, setShowQR] = useState(false);

  const generateQR = () => {

    if(!credentialId){
      alert("Enter Credential ID");
      return;
    }

    setShowQR(true);
  };

  return (

    <div>

      <h3>Share Credential</h3>

      <input
        placeholder="Enter Credential ID"
        onChange={(e)=>setCredentialId(e.target.value)}
      />

      <button onClick={generateQR}>
        Generate QR
      </button>

      <br/><br/>

      {showQR && (
        <div>

          <p>Scan this QR to verify credential</p>

          <QRCodeCanvas
            value={credentialId}
            size={200}
          />

        </div>
      )}

    </div>

  );

}

export default ShareCredential;