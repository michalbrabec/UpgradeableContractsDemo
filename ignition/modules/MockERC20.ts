import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MockERC20Module", (m) => {
  const MockUSDT = m.contract("MockERC20", ["Mock USDT", "USDT"]);

  return { MockUSDT };
});