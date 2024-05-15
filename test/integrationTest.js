// integrationTests.js
const assert = require("assert");
const { encryptFile } = require("../scripts/encrypt");
const { uploadToIPFS } = require("../scripts/upload");

describe("Integration Tests", () => {
  it("Should encrypt and upload file to IPFS", async () => {
    const { key, iv } = encryptFile("test.txt", "password");
    const path = await uploadToIPFS("test.txt.enc");
    assert.ok(path);
  });
});
