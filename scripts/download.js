// download.js
const ipfsClient = require("ipfs-http-client");
const fs = require("fs");

async function downloadFromIPFS(cid, savePath) {
  const client = ipfsClient.create();
  const stream = client.cat(cid);
  const writer = fs.createWriteStream(savePath);

  for await (const chunk of stream) {
    writer.write(chunk);
  }

  writer.end();
}

module.exports = { downloadFromIPFS };
