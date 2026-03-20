import React from "react";

function HomePage() {

  return (

    <div className="container">

      <div className="card p-5 text-center">

        <h2 className="mb-3">Decentralized Identity Verification</h2>

        <p>
          This platform provides secure digital identity using modern
          decentralized technologies.
        </p>

        <hr/>

        <div className="row mt-4">

          <div className="col-md-4">
            <div className="card p-3">
              <h5>Blockchain DID</h5>
              <p>Decentralized Identity for secure digital ownership.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <h5>Credential Verification</h5>
              <p>Issue and verify academic or professional credentials.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <h5>AI Security</h5>
              <p>Anomaly detection using machine learning.</p>
            </div>
          </div>

        </div>

      </div>

    </div>

  );

}

export default HomePage;