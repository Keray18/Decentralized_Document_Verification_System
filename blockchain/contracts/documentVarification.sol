// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVarifier {

    mapping (string => address) public documentOwner;
    event documentStored(string _hash, address);

    function storeDocument(string memory _hash) public {
        require(documentOwner[_hash] == address(0), "Document already exists.");
        documentOwner[_hash] = msg.sender;
        emit documentStored(_hash, msg.sender);
    
    }

    function verifyDocument(string memory _hash) public view returns (address) {
        return documentOwner[_hash];
    }
}