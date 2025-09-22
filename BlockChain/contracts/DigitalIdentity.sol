// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DigitalIdentity {
    struct Identity {
        bytes32 documentHash;
        string publicKey;
        string ipfsCID;
        uint256 timestamp;
        address owner;
    }

    mapping(address => Identity) private identities;

    event DigitalIDCreated(
        address indexed owner,
        bytes32 documentHash,
        string publicKey,
        string ipfsCID,
        uint256 timestamp
    );

    function createIdentity(
        bytes32 _documentHash,
        string calldata _publicKey,
        string calldata _ipfsCID
    ) external {
        require(identities[msg.sender].timestamp == 0, "Identity already exists");

        identities[msg.sender] = Identity({
            documentHash: _documentHash,
            publicKey: _publicKey,
            ipfsCID: _ipfsCID,
            timestamp: block.timestamp,
            owner: msg.sender
        });

        emit DigitalIDCreated(msg.sender, _documentHash, _publicKey, _ipfsCID, block.timestamp);
    }

    function getIdentity(address _owner) external view returns (
        bytes32 documentHash,
        string memory publicKey,
        string memory ipfsCID,
        uint256 timestamp
    ) {
        Identity storage id = identities[_owner];
        require(id.timestamp != 0, "Identity does not exist");
        return (id.documentHash, id.publicKey, id.ipfsCID, id.timestamp);
    }
}
