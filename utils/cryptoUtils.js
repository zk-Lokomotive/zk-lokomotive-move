// cryptoUtils.js
const crypto = require("crypto");

function generateKey(password) {
  return crypto.scryptSync(password, "salt", 24);
}

module.exports = { generateKey };
