const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const app = express();

app.use(cors({
  origin: "*",   // allow all (for now)
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

/* ---------------------------
   MongoDB Connection
----------------------------*/

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

/* ---------------------------
   DID Schema
----------------------------*/

const DIDSchema = new mongoose.Schema({
  did: String,
  publicKey: String,
  privateKey: String
});

const DID = mongoose.model("DID", DIDSchema);

/* ---------------------------
   Credential Schema
----------------------------*/

const CredentialSchema = new mongoose.Schema({
  id: String,
  issuer: String,
  holder: String,
  type: String,
  data: Object,
  status: String,
  expiryDate: Date,
});

const Credential = mongoose.model("Credential", CredentialSchema);

/* ---------------------------
   Verification Schema
----------------------------*/

const VerificationSchema = new mongoose.Schema({
  credentialId: String,
  verifier: String,
  result: Boolean,
  timestamp: Date
});

const Verification = mongoose.model("Verification", VerificationSchema);

const LogSchema = new mongoose.Schema({
  action: String,
  credentialId: String,
  result: String,
  timestamp: Date
});

const Log = mongoose.model("Log", LogSchema);

/* ---------------------------
   CREATE DID
----------------------------*/

app.post("/createDID", async (req, res) => {

  const uniqueID = uuidv4();
  const did = `did:somrik:${uniqueID}`;

  const publicKey = uuidv4();
  const privateKey = uuidv4();

  const newDID = new DID({
    did,
    publicKey,
    privateKey
  });

  await newDID.save();

  res.json({
    message: "DID created successfully",
    did,
    publicKey,
    privateKey
  });

});

app.get("/", (req, res) => {
  res.send("DID Backend is running 🚀");
});


/* ---------------------------
   RESOLVE DID
----------------------------*/

app.get("/resolveDID/:did", async (req, res) => {

  try {

    const record = await DID.findOne({
      did: req.params.did
    });

    if (!record) {
      return res.json({
        message: "DID not found"
      });
    }

    res.json({
      did: record.did,
      publicKey: record.publicKey
    });

  } catch (error) {

    res.status(500).json({
      message: "Error resolving DID"
    });

  }

});

/* ---------------------------
   ISSUE CREDENTIAL
----------------------------*/

app.post("/issueCredential", async (req, res) => {

  const { issuer, holder, type, data } = req.body;

  try {

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 5); // expires in 5 years

    const credential = new Credential({
      id: uuidv4(),
      issuer,
      holder,
      type,
      data,
      status: "active",
      expiryDate
    });

    await credential.save();

    res.json({
      message: "Credential issued successfully",
      credential
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({
      message: "Error issuing credential"
    });

  }

});

/* ---------------------------
   VERIFY CREDENTIAL
----------------------------*/

app.get("/verifyCredential/:id", async (req, res) => {

  try {

    const credential = await Credential.findOne({
      id: req.params.id
    });

    let result = "success";

    if (!credential) {
      result = "not_found";
    }

    if (credential && credential.status === "revoked") {
      result = "revoked";
    }

    // Save log
    const log = new Log({
      action: "verify",
      credentialId: req.params.id,
      result: result,
      timestamp: new Date()
    });

    await log.save();

    if (!credential) {
      return res.json({
        verified: false,
        message: "Credential not found"
      });
    }

    if (credential.status === "revoked") {
      return res.json({
        verified: false,
        message: "Credential revoked"
      });
    }

    if (new Date() > credential.expiryDate) {
      return res.json({
        verified: false,
        message: "Credential expired"
      });
    }

    if (credential.expiryDate && new Date() > credential.expiryDate) {
      return res.json({
        verified: false,
        message: "Credential expired"
      });
    }

    res.json({
      verified: true,
      credential
    });

  } catch (error) {

    res.status(500).json({
      message: "Verification error"
    });

  }

});

/* ---------------------------
   REVOKE CREDENTIAL
----------------------------*/

app.post("/revokeCredential/:id", async (req, res) => {

  try {

    const credential = await Credential.findOne({
      id: req.params.id
    });

    if (!credential) {
      return res.json({
        message: "Credential not found"
      });
    }

    credential.status = "revoked";

    await credential.save();

    res.json({
      message: "Credential revoked",
      credential
    });

  } catch (error) {

    res.status(500).json({
      message: "Revocation error"
    });

  }

});

/* ---------------------------
   Verify By Company
----------------------------*/

app.post("/verifyByCompany", async (req, res) => {

  const { credentialId, company } = req.body;

  try {

    const credential = await Credential.findOne({
      id: credentialId
    });

    let verified = false;

    if (credential && credential.status === "active") {
      verified = true;
    }

    const log = new Verification({
      credentialId,
      verifier: company,
      result: verified,
      timestamp: new Date()
    });

    await log.save();

    res.json({
      verified,
      credential
    });

  } catch (error) {

    res.status(500).json({
      message: "Verification error"
    });

  }

});

/* ---------------------------
   GET CREDENTIALS BY HOLDER
----------------------------*/

app.get("/credentials/:holder", async (req, res) => {

  try {

    const credentials = await Credential.find({
      holder: req.params.holder
    });

    res.json(credentials);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching credentials"
    });

  }

});

/* ---------------------------
   START SERVER
----------------------------*/

app.listen(5000, () => {
  console.log("Server running on port 5000");
});