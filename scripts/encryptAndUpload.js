const fs = require("fs");
const crypto = require("crypto");
const ipfsClient = require("ipfs-http-client");
const { storeFileDataOnBlockchain } = require("./contractUtils"); // Sui blockchain entegrasyonu için yardımcı fonksiyonlar

// IPFS client'ını yapılandır
const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

/**
 * Dosya şifrelemek ve IPFS'e yüklemek için fonksiyon
 * @param {string} filePath - Şifrelenecek dosya yolu
 * @param {string} receiverAddress - Dosyanın alıcısının Sui adresi
 * @param {string} password - Şifreleme için kullanılacak parola
 */
async function encryptAndUpload(filePath, receiverAddress, password) {
  try {
    // Dosya içeriğini oku
    const fileContent = fs.readFileSync(filePath);

    // AES-256 şifreleme anahtarını ve IV'yi oluştur
    const key = crypto.scryptSync(password, "salt", 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    // Dosyayı şifrele
    let encrypted = cipher.update(fileContent, "utf8", "hex");
    encrypted += cipher.final("hex");

    // Şifrelenmiş dosyayı IPFS'e yükle
    const { path } = await ipfs.add({ content: Buffer.from(encrypted, "hex") });

    // Blockchain üzerinde dosya meta verilerini kaydet
    await storeFileDataOnBlockchain({
      owner: receiverAddress, // Bu örnekte alıcı adresini direkt kullanıyoruz
      hash: crypto.createHash("sha256").update(fileContent).digest("hex"),
      ipfsLink: path,
      zeroKnowledgeProof: "example-proof", // ZKP simülasyonu, gerçek uygulamada dinamik olmalı
    });

    console.log("Dosya başarıyla şifrelendi ve IPFS'e yüklendi:", path);
  } catch (error) {
    console.error(
      "Dosya şifreleme ve yükleme işlemi sırasında hata oluştu:",
      error,
    );
  }
}

module.exports = { encryptAndUpload };
