import hre from "hardhat";
// import { USDT_CONFIG } from "./config.js";
import MockERC20Module from "../ignition/modules/MockERC20.js";
async function main() {
  const connection = await hre.network.connect();

  let usdtAddress = undefined;

  if (connection.networkName === "sepolia") {
    // usdtAddress = USDT_CONFIG.sepolia;
  } else if (
    connection.networkName === "localhost" ||
    connection.networkName === "default"
  ) {
    const { MockUSDT } = await connection.ignition.deploy(MockERC20Module, {
      displayUi: true,
    });
    usdtAddress = MockUSDT.address;
  } else {
    throw new Error(`Unsupported network: ${connection.networkName}`);
  }
}

main().catch(console.error);