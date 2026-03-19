// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DIDRegistry {

    struct DID {
        string did;
        string publicKey;
    }

    mapping(string => DID) public dids;

    function registerDID(string memory _did, string memory _publicKey) public {
        dids[_did] = DID(_did, _publicKey);
    }

    function resolveDID(string memory _did) public view returns (string memory, string memory) {
        DID memory record = dids[_did];
        return (record.did, record.publicKey);
    }

    function updateDID(string memory _did, string memory _newPublicKey) public {
        dids[_did].publicKey = _newPublicKey;
    }
}