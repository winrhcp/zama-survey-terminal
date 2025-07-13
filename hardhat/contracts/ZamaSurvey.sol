// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/FHEUint.sol";

contract ZamaSurvey {
    struct Survey {
        address user;
        euint8[5] answers;
    }

    mapping(address => euint8[5]) public userAnswers;

    function submitAnswers(euint8[5] calldata answers) external {
        userAnswers[msg.sender] = answers;
    }

    function getAnswer(address user, uint index) public view returns (euint8) {
        return userAnswers[user][index];
    }
}
