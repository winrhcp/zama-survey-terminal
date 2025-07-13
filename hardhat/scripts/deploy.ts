import { ethers } from "hardhat";

async function main() {
  const contractFactory = await ethers.getContractFactory("ZamaSurvey");
  const contract = await contractFactory.deploy();
  await contract.deployed();

  console.log(`✅ ZamaSurvey deployed at: ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
