// ipfsConfig.js
const IPFS = require("ipfs-http-client");

const ipfs = IPFS.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

module.exports = ipfs;
