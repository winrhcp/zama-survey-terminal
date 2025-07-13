import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    zama: {
      url: "https://devnet.zama.ai", // Replace with the real Zama devnet RPC
      chainId: 9001,                 // Replace with actual chain ID
      accounts: [process.env.PRIVATE_KEY!]
    }
  }
};

export default config;
