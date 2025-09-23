import hre from "hardhat";

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import DemoModule from "../ignition/modules/ProxyModule.js";
import UpgradeModule from "../ignition/modules/UpgradeModule.js";

describe("Demo Proxy", async function () {
  const { ignition, viem } = await hre.network.connect();

  describe("Proxy interaction", function () {
    it("Should be interactable via proxy", async function () {
      const [, otherAccount] = await viem.getWalletClients();

      const { demo } = await ignition.deploy(DemoModule);

      assert.equal(
        await demo.read.version({ account: otherAccount.account.address }),
        "1.0.0"
      );
    });
  });

  describe("Upgrading", function () {
    it("Should have upgraded the proxy to DemoV2", async function () {
      const [, otherAccount] = await viem.getWalletClients();

      const { demo } = await ignition.deploy(UpgradeModule);

      assert.equal(
        await demo.read.version({ account: otherAccount.account.address }),
        "2.0.0"
      );
    });

    it("Should have set the name during upgrade", async function () {
      const [, otherAccount] = await viem.getWalletClients();

      const { demo } = await ignition.deploy(UpgradeModule);

      assert.equal(
        await demo.read.name({ account: otherAccount.account.address }),
        "Example Name"
      );
    });
  });
});
