const fs = require("fs");
const crypto = require("crypto");
const ipfsClient = require("ipfs-http-client");
const { validateProof } = require("./cryptoUtils"); // Sıfır bilgi kanıtını doğrulama fonksiyonu

// IPFS client'ını yapılandır
const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

/**
 * Dosyayı IPFS'ten indirir, şifresini çözer ve doğrular
 * @param {string} ipfsLink - Dosyanın IPFS'teki bağlantısı
 * @param {string} savePath - Dosyanın kaydedileceği yerel yol
 * @param {Buffer} key - Şifre çözme anahtarı
 * @param {Buffer} iv - Şifre çözme için kullanılacak başlangıç vektörü (IV)
 * @param {string} proof - Dosyanın bütünlüğünü doğrulamak için kullanılan sıfır bilgi kanıtı
 * @returns {Promise<boolean>} - Dosyanın başarıyla doğrulanıp doğrulanmadığı
 */
async function verifyAndDownload(ipfsLink, savePath, key, iv, proof) {
  try {
    // IPFS'ten dosyayı indir
    const chunks = [];
    for await (const chunk of ipfs.cat(ipfsLink)) {
      chunks.push(chunk);
    }
    const encryptedData = Buffer.concat(chunks);

    // AES şifresini çöz
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // Dosyayı yerel diske kaydet
    fs.writeFileSync(savePath, decrypted);

    // Dosyanın bütünlüğünü sıfır bilgi kanıtı ile doğrula
    const isValid = validateProof(decrypted, proof);
    if (!isValid) {
      console.error("Dosya doğrulaması başarısız oldu.");
      return false;
    }

    console.log("Dosya başarıyla indirildi ve doğrulandı.");
    return true;
  } catch (error) {
    console.error("Dosya indirme ve doğrulama sırasında hata oluştu:", error);
    return false;
  }
}

module.exports = { verifyAndDownload };
