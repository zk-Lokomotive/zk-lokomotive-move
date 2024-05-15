// upload.js
const ipfsClient = require("ipfs-http-client");
const fs = require("fs");

async function uploadToIPFS(filePath) {
  const client = ipfsClient.create();
  const file = fs.readFileSync(filePath);
  const result = await client.add(file);
  return result.path;
}

module.exports = { uploadToIPFS };
