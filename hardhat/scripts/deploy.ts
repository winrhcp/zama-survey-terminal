const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying ZamaSurvey contract...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Get account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy the contract
  const ZamaSurvey = await ethers.getContractFactory("ZamaSurvey");
  const zamaSurvey = await ZamaSurvey.deploy(deployer.address);

  await zamaSurvey.waitForDeployment();
  const contractAddress = await zamaSurvey.getAddress();

  console.log("ZamaSurvey deployed to:", contractAddress);
  console.log("Owner set to:", deployer.address);

  return contractAddress;
}

main()
  .then((address) => {
    console.log(`\nDeployment successful!`);
    console.log(`Contract address: ${address}`);
    console.log(`Update this address in src/App.tsx`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });