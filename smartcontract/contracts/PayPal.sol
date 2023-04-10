// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract PayPal {
    struct Request {
        address requestor;
        uint256 amount;
        string message;
        string name;
    }

    struct SendReceive {
        string action;
        uint256 amount;
        string message;
        string otherParyName;
        address otherParyAddress;
    }

    struct UserName {
        string name;
        bool hasName;
    }

    address public owner;

    mapping(address => UserName) names;
    mapping(address => Request[]) requests;
    mapping(address => SendReceive[]) history;

    constructor() {
        owner = msg.sender;
    }

    function addName(string memory _name) public {
        UserName storage newUserName = names[msg.sender];
        newUserName.name = _name;
        newUserName.hasName = true;
    }

    function createRequest(
        address user,
        uint256 _amount,
        string memory _message
    ) public {
        Request memory newRequest;
        newRequest.requestor = msg.sender;
        newRequest.message = _message;
        newRequest.amount = _amount;

        if (names[msg.sender].hasName) {
            newRequest.name = names[msg.sender].name;
        } else {
            newRequest.name = "NoName";
        }

        requests[user].push(newRequest);
    }
}
