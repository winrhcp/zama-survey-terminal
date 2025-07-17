// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleSurvey is Ownable {
    struct Survey {
        address user;
        uint8[5] answers;
        uint256 timestamp;
    }

    mapping(address => Survey) public userSurveys;
    mapping(address => bool) public hasSubmitted;
    
    event SurveySubmitted(address indexed user, uint256 timestamp);

    constructor(address owner) Ownable(owner) {}

    function submitAnswers(uint8[5] calldata answers) external {
        require(!hasSubmitted[msg.sender], "Survey already submitted");
        
        // Validate answers (A=65, B=66, C=67, D=68)
        for (uint i = 0; i < 5; i++) {
            require(answers[i] >= 65 && answers[i] <= 68, "Invalid answer");
        }
        
        userSurveys[msg.sender] = Survey({
            user: msg.sender,
            answers: answers,
            timestamp: block.timestamp
        });
        
        hasSubmitted[msg.sender] = true;
        
        emit SurveySubmitted(msg.sender, block.timestamp);
    }

    function getAnswer(address user, uint256 index) public view returns (uint8) {
        require(index < 5, "Invalid answer index");
        require(hasSubmitted[user], "User has not submitted survey");
        return userSurveys[user].answers[index];
    }

    function getSurveyTimestamp(address user) public view returns (uint256) {
        require(hasSubmitted[user], "User has not submitted survey");
        return userSurveys[user].timestamp;
    }

    function getAllAnswers(address user) public view returns (uint8[5] memory) {
        require(hasSubmitted[user], "User has not submitted survey");
        return userSurveys[user].answers;
    }

    function getTotalSubmissions() public view onlyOwner returns (uint256) {
        // Note: This would require additional tracking in a real implementation
        // For now, return 0 as placeholder
        return 0;
    }
}