const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying ZamaSurvey contract...");
  
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");
  
  const ZamaSurvey = await ethers.getContractFactory("ZamaSurvey");
  const zamaSurvey = await ZamaSurvey.deploy(deployer.address);
  
  await zamaSurvey.waitForDeployment();
  const contractAddress = await zamaSurvey.getAddress();
  
  console.log("ZamaSurvey contract deployed to:", contractAddress);
  console.log("Update this address in src/App.tsx");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });