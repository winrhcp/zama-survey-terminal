// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, externalEuint8, ebool, euint8} from "@fhevm/solidity/lib/FHE.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

contract ZamaSurvey is Ownable, SepoliaConfig {
    using FHE for *;

    struct Survey {
        address user;
        euint8[5] answers;
        uint256 timestamp;
    }

    mapping(address => Survey) public userSurveys;
    mapping(address => bool) public hasSubmitted;
    
    event SurveySubmitted(address indexed user, uint256 timestamp);

    constructor(address owner) Ownable(owner) {}

    function submitAnswers(
        externalEuint8[5] calldata answerInputs,
        bytes[5] calldata inputProofs
    ) external {
        require(!hasSubmitted[msg.sender], "Survey already submitted");
        
        euint8[5] memory encryptedAnswers;
        
        // Convert external encrypted inputs to internal encrypted types
        for (uint i = 0; i < 5; i++) {
            encryptedAnswers[i] = answerInputs[i].fromExternal(inputProofs[i]);
            
            // Grant FHE permissions
            FHE.allowThis(encryptedAnswers[i]);
            FHE.allow(encryptedAnswers[i], msg.sender);
        }
        
        userSurveys[msg.sender] = Survey({
            user: msg.sender,
            answers: encryptedAnswers,
            timestamp: block.timestamp
        });
        
        hasSubmitted[msg.sender] = true;
        
        emit SurveySubmitted(msg.sender, block.timestamp);
    }

    function getAnswer(address user, uint256 index) public view returns (euint8) {
        require(index < 5, "Invalid answer index");
        require(hasSubmitted[user], "User has not submitted survey");
        return userSurveys[user].answers[index];
    }

    function getSurveyTimestamp(address user) public view returns (uint256) {
        require(hasSubmitted[user], "User has not submitted survey");
        return userSurveys[user].timestamp;
    }

    function getTotalSubmissions() public view onlyOwner returns (uint256) {
        // Note: This would require additional tracking in a real implementation
        // For now, return 0 as placeholder
        return 0;
    }

    // Function to verify if user can decrypt their own answers
    function canViewOwnAnswers(address user) public view returns (bool) {
        return hasSubmitted[user] && msg.sender == user;
    }

    // Note: Decryption functions require FHEVM plugin and proper environment setup
    // These functions are commented out until plugin compatibility is resolved
    
    /*
    // Decrypt answer for authorized user (only their own answers)
    function decryptAnswer(uint256 index) public view returns (uint8) {
        require(index < 5, "Invalid answer index");
        require(hasSubmitted[msg.sender], "User has not submitted survey");
        
        return FHE.decrypt(userSurveys[msg.sender].answers[index]);
    }

    // Decrypt all answers for authorized user (only their own answers)
    function decryptAllAnswers() public view returns (uint8[5] memory) {
        require(hasSubmitted[msg.sender], "User has not submitted survey");
        
        uint8[5] memory decryptedAnswers;
        for (uint i = 0; i < 5; i++) {
            decryptedAnswers[i] = FHE.decrypt(userSurveys[msg.sender].answers[i]);
        }
        return decryptedAnswers;
    }
    */
}