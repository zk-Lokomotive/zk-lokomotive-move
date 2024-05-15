// verify.js
const crypto = require("crypto");

function verifyFile(filePath, originalKey, originalIv) {
  const key = Buffer.from(originalKey, "hex");
  const iv = Buffer.from(originalIv, "hex");
  const decipher = crypto.createDecipheriv("aes-192-cbc", key, iv);
  const input = fs.createReadStream(filePath + ".enc");
  const output = fs.createWriteStream(filePath + ".dec");

  input.pipe(decipher).pipe(output);
}

module.exports = { verifyFile };
