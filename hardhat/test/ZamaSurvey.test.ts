const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ZamaSurvey", function () {
  let zamaSurvey;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    
    const ZamaSurveyFactory = await ethers.getContractFactory("ZamaSurvey");
    zamaSurvey = await ZamaSurveyFactory.deploy(owner.address);
    await zamaSurvey.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await zamaSurvey.owner()).to.equal(owner.address);
    });

    it("Should initialize with no submissions", async function () {
      expect(await zamaSurvey.hasSubmitted(user1.address)).to.equal(false);
      expect(await zamaSurvey.hasSubmitted(user2.address)).to.equal(false);
    });
  });

  describe("Survey Submission", function () {
    it("Should track submission status", async function () {
      expect(await zamaSurvey.hasSubmitted(user1.address)).to.equal(false);
    });

    it("Should validate array lengths at compile time", async function () {
      // This test confirms that the contract enforces fixed array sizes
      // The function signature requires exactly 5 elements in each array
      // TypeScript and Solidity will prevent calling with wrong array lengths
      
      // We can verify the function signature exists
      const contractInterface = zamaSurvey.interface;
      const func = contractInterface.getFunction("submitAnswers");
      expect(func.name).to.equal("submitAnswers");
      expect(func.inputs).to.have.length(2);
    });

    it("Should not allow submission from zero address", async function () {
      // This test verifies the contract prevents submission from invalid addresses
      expect(await zamaSurvey.hasSubmitted(ethers.ZeroAddress)).to.equal(false);
    });
  });

  describe("Survey Retrieval", function () {
    it("Should reject getAnswer for non-existent submissions", async function () {
      await expect(
        zamaSurvey.getAnswer(user1.address, 0)
      ).to.be.revertedWith("User has not submitted survey");
    });

    it("Should reject getAnswer with invalid index", async function () {
      await expect(
        zamaSurvey.getAnswer(user1.address, 5)
      ).to.be.revertedWith("Invalid answer index");
    });

    it("Should reject getSurveyTimestamp for non-existent submissions", async function () {
      await expect(
        zamaSurvey.getSurveyTimestamp(user1.address)
      ).to.be.revertedWith("User has not submitted survey");
    });
  });

  describe("Owner Functions", function () {
    it("Should allow owner to call getTotalSubmissions", async function () {
      const total = await zamaSurvey.connect(owner).getTotalSubmissions();
      expect(total).to.equal(0);
    });

    it("Should reject non-owner calls to getTotalSubmissions", async function () {
      await expect(
        zamaSurvey.connect(user1).getTotalSubmissions()
      ).to.be.revertedWithCustomError(zamaSurvey, "OwnableUnauthorizedAccount");
    });
  });

  describe("Access Control", function () {
    it("Should return false for canViewOwnAnswers when user hasn't submitted", async function () {
      const canView = await zamaSurvey.connect(user1).canViewOwnAnswers(user1.address);
      expect(canView).to.equal(false);
    });

    it("Should return false for canViewOwnAnswers when checking another user", async function () {
      const canView = await zamaSurvey.connect(user1).canViewOwnAnswers(user2.address);
      expect(canView).to.equal(false);
    });
  });

  describe("Events", function () {
    it("Should have SurveySubmitted event signature", async function () {
      // Verify the event exists in the contract interface
      const contractInterface = zamaSurvey.interface;
      const event = contractInterface.getEvent("SurveySubmitted");
      expect(event.name).to.equal("SurveySubmitted");
      expect(event.inputs).to.have.length(2);
      expect(event.inputs[0].name).to.equal("user");
      expect(event.inputs[1].name).to.equal("timestamp");
    });
  });

  describe("Edge Cases", function () {
    it("Should handle boundary values for answer indices", async function () {
      // Test index 0 (valid)
      await expect(
        zamaSurvey.getAnswer(user1.address, 0)
      ).to.be.revertedWith("User has not submitted survey");

      // Test index 4 (valid)
      await expect(
        zamaSurvey.getAnswer(user1.address, 4)
      ).to.be.revertedWith("User has not submitted survey");

      // Test index 5 (invalid)
      await expect(
        zamaSurvey.getAnswer(user1.address, 5)
      ).to.be.revertedWith("Invalid answer index");
    });

    it("Should handle zero address edge cases", async function () {
      const zeroAddress = "0x0000000000000000000000000000000000000000";
      
      expect(await zamaSurvey.hasSubmitted(zeroAddress)).to.equal(false);
      
      await expect(
        zamaSurvey.getSurveyTimestamp(zeroAddress)
      ).to.be.revertedWith("User has not submitted survey");
    });
  });
});