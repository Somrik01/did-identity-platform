import React from "react";
import CreateDID from "./CreateDID";
import ViewCredential from "./ViewCredential";
import ShareCredential from "./ShareCredential";

function WalletPage(){

  return(

    <div className="container">

      <h2 className="mb-4">User Wallet</h2>

      <div className="card p-4 mb-4 wallet-card">
        <h4 className="mb-2"> </h4>
        <CreateDID/>
      </div>

      <div className="card p-4 mb-4 wallet-card">
        <h4 className="mb-2"> </h4>
        <ViewCredential/>
      </div>

      <div className="card p-4 wallet-card">
        <h4 className="mb-2"> </h4>
        <ShareCredential/>
      </div>

    </div>

  );

}

export default WalletPage;