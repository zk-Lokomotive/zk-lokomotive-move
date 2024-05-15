// encrypt.js
const fs = require("fs");
const crypto = require("crypto");

function encryptFile(filePath, password) {
  const key = crypto.scryptSync(password, "salt", 24);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-192-cbc", key, iv);
  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(filePath + ".enc");

  input.pipe(cipher).pipe(output);

  return { iv: iv.toString("hex"), key: key.toString("hex") };
}

module.exports = { encryptFile };
