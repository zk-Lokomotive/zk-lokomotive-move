const crypto = require("crypto");

/**
 * AES şifreleme anahtarını ve IV (Initialization Vector) oluşturur.
 * @param {string} password - Kullanıcıdan alınan parola
 * @returns {Object} Anahtar ve IV içeren bir nesne
 */
function generateKeyAndIV(password) {
  const salt = crypto.randomBytes(16); // Güvenli tuz oluştur
  const key = crypto.scryptSync(password, salt, 32); // 256-bit anahtar
  const iv = crypto.randomBytes(16); // AES için 128-bit IV
  return { key, iv, salt };
}

/**
 * Belirtilen dosyanın içeriğini AES-256-CBC şifreleme algoritması ile şifreler.
 * @param {Buffer} data - Şifrelenecek veri
 * @param {Buffer} key - Şifreleme anahtarı
 * @param {Buffer} iv - Initialization Vector
 * @returns {Buffer} Şifrelenmiş veri
 */
function encryptData(data, key, iv) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted;
}

/**
 * AES-256-CBC şifreleme algoritması ile şifrelenmiş veriyi çözer.
 * @param {Buffer} encryptedData - Şifrelenmiş veri
 * @param {Buffer} key - Şifreleme anahtarı
 * @param {Buffer} iv - Initialization Vector
 * @returns {Buffer} Şifresi çözülmüş veri
 */
function decryptData(encryptedData, key, iv) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted;
}

module.exports = {
  generateKeyAndIV,
  encryptData,
  decryptData,
};
