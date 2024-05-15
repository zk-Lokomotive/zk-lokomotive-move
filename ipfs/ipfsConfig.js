// ipfs-http-client modülünü içe aktar
const IPFS = require("ipfs-http-client");

// IPFS istemcisini yapılandır
const ipfs = IPFS.create({
  host: "ipfs.infura.io", // Infura IPFS hizmetinin ana bilgisayar adresi
  port: 5001, // Infura IPFS hizmeti için port numarası
  protocol: "https", // Güvenli bir bağlantı için protokol
  apiPath: "/api/v0", // API yolunu belirtir, varsayılan '/api/v0' kullanılır
  headers: {
    authorization:
      "Basic " +
      Buffer.from("your_project_id:your_project_secret").toString("base64"),
  },
});

// Dışa aktarma işlemi, diğer dosyalarda bu yapılandırmayı kullanabilmek için
module.exports = ipfs;
