import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("Deploying ZamaSurvey contract...");
  console.log("Deploying with account:", deployer);

  const deployedZamaSurvey = await deploy("ZamaSurvey", {
    from: deployer,
    args: [deployer],
    log: true,
  });

  console.log(`ZamaSurvey contract: `, deployedZamaSurvey.address);
  console.log(`Update this address in src/App.tsx`);
};

export default func;
func.id = "deploy_zamaSurvey";
func.tags = ["ZamaSurvey"];