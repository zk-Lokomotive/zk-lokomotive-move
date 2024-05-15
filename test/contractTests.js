// contractTests.js
const assert = require("assert");
const {
  deployContract,
  interactWithContract,
} = require("../utils/contractUtils");

describe("FileManager Contract Tests", () => {
  it("Should deploy FileManager contract", async () => {
    const result = await deployContract("FileManager.move", "testnet");
    assert.ok(result.success);
  });
});
