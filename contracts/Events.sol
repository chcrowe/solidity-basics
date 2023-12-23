// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// Structs
contract Events1 {
    string public message = "Hello World";

    // Note: events have a 17 argument limit
    // all basic data types supported (e.g. string, uint, address, bool, etc...)
    // limited to 3 indexed arguments
    event MessageUpdated(
        address indexed _user,
        string _message
    );

    function updateMessage(string memory _message) public {
        message = _message;
        emit MessageUpdated(msg.sender, _message);
    }
  
}
