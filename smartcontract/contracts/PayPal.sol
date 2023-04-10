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

    constructor() {
        owner = msg.sender;
    }
}
