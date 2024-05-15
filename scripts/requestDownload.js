const { getFileFromBlockchain, checkAccess } = require("./contractUtils");

/**
 * Dosya indirme talebini yöneten fonksiyon
 * @param {string} userAddress - Dosya talep eden kullanıcının Sui adresi
 * @param {string} fileHash - İndirilmek istenen dosyanın hash değeri
 * @returns {Promise<string>} - Dosya indirme için IPFS linki
 */
async function requestDownload(userAddress, fileHash) {
  try {
    // Kullanıcının dosyaya erişim hakkını kontrol et
    const hasAccess = await checkAccess(userAddress, fileHash);
    if (!hasAccess) {
      console.error(
        "Erişim reddedildi: Bu kullanıcının dosyayı indirme yetkisi yok.",
      );
      return null;
    }

    // Blockchain'den dosyanın IPFS linkini al
    const ipfsLink = await getFileFromBlockchain(fileHash);
    if (!ipfsLink) {
      console.error("Dosya bulunamadı: IPFS linki mevcut değil.");
      return null;
    }

    console.log("Dosya başarıyla bulundu, IPFS linki:", ipfsLink);
    return ipfsLink;
  } catch (error) {
    console.error("Dosya indirme talebi sırasında hata oluştu:", error);
    return null;
  }
}

module.exports = { requestDownload };
